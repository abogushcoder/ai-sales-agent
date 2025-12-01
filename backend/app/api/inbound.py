import os
import json
import traceback
import asyncio
from dotenv import load_dotenv
from fastapi import APIRouter, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from pydantic import ValidationError
from twilio.twiml.voice_response import VoiceResponse, Connect
from twilio.rest import Client as TwilioClient

from elevenlabs import ElevenLabs
from elevenlabs.conversational_ai.conversation import (
    Conversation,
    ClientTools,
    ConversationInitiationData,
)
from services.twilio_audio_interface import TwilioAudioInterface
from datetime import datetime
from .models import ScheduleAppointmentPayload

load_dotenv()

ELEVEN_LABS_AGENT_ID = os.getenv("ELEVENLABS_AGENT_ID")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
HUMAN_OPERATOR_NUMBER = os.getenv("HUMAN_OPERATOR_NUMBER")

AGENT_NAME = os.getenv("AGENT_NAME", "Alex")  # optional, at top of file
DEALERSHIP_NAME = os.getenv("DEALERSHIP_NAME", "Bogush Motors")


if (
    ELEVEN_LABS_AGENT_ID is None
    or ELEVENLABS_API_KEY is None
    or TWILIO_ACCOUNT_SID is None
    or TWILIO_AUTH_TOKEN is None
    or HUMAN_OPERATOR_NUMBER is None
):
    print("An entry in the .env file is missing or incorrect")
    raise Exception


twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

router = APIRouter()


@router.get("/")
async def root():
    return {"message": "Twilio-ElevenLabs Integration Server"}


@router.post("/incoming-call")
async def handle_incoming_call(request: Request):
    form_data = await request.form()
    call_sid = form_data.get("CallSid", "Unknown")
    from_number = form_data.get("From", "Unknown")
    print(f"Incoming call: CallSid={call_sid}, From={from_number}")

    response = VoiceResponse()
    connect = Connect()
    connect.stream(url=f"wss://{request.url.hostname}/media-stream")
    response.append(connect)
    return HTMLResponse(content=str(response), media_type="application/xml")


@router.websocket("/media-stream")
async def handle_media_stream(websocket: WebSocket):
    await websocket.accept()
    print("WebSocket connection opened")

    audio_interface = TwilioAudioInterface(websocket)
    eleven_labs_client = ElevenLabs(api_key=ELEVENLABS_API_KEY)

    conversation = None

    try:
        # 1) Wait until Twilio sends the "start" event so we have a streamSid
        while audio_interface.stream_sid is None:
            msg = await websocket.receive_text()
            data = json.loads(msg)
            await audio_interface.handle_twilio_message(data)
            # This will set audio_interface.stream_sid when event == "start"

        print(f"Got Twilio streamSid: {audio_interface.stream_sid}")

        loop = asyncio.get_running_loop()

        client_tools = ClientTools(loop=loop)

        # dynamic variables required by the agent: agent_name, dealership_name
        dynamic_vars = {
            "agent_name": AGENT_NAME,
            "dealership_name": DEALERSHIP_NAME,
        }

        conv_config = ConversationInitiationData(dynamic_variables=dynamic_vars)

        async def schedule_appointment(params: dict):
            """
            Tool called by the Scheduler subagent when it has all appointment details.
            """
            try:
                payload = ScheduleAppointmentPayload(**params)
            except ValidationError as e:
                print("Invalid schedule_appointment payload from agent:", e)
                return "I had trouble saving your appointment. A team member will follow up to confirm."

            print("Creating appointment with payload:", payload.dict())

            # TODO: Insert into your DB / CRM here
            # Example (pseudo-code):
            # appointment_id = db.create_appointment(
            #     dealership_id=dealer_id,
            #     customer_name=payload.customer_name,
            #     phone_number=payload.phone_number,
            #     appointment_type=payload.appointment_type,
            #     date=payload.date,
            #     time=payload.time,
            #     timezone=payload.timezone,
            #     vehicle=payload.vehicle,
            #     notes=payload.notes,
            # )

            # Optionally, normalize for human-friendly confirmation:
            when_str = f"{payload.date} at {payload.time}"

            return f"Your appointment has been saved for {when_str}."

        async def transfer_to_human(params: dict):
            """
            Tool called by the ElevenLabs agent when it wants to hand off
            the caller to a human operator.
            """
            reason = params.get("reason", "")
            print(f"transfer_to_human tool called. Reason: {reason}")

            if not audio_interface.call_sid:
                print("No call_sid available for transfer")
                return "I cannot transfer you right now"

            try:
                # Stop any current AI audio on the call
                await audio_interface.send_clear_message_to_twilio()

                # Tell Twilio to redirect the live call to the human operator
                # This replaces the <Connect><Stream> with new TwiML that dials your human.
                twiml = f"<Response><Dial>{HUMAN_OPERATOR_NUMBER}</Dial></Response>"
                twilio_client.calls(audio_interface.call_sid).update(twiml=twiml)
                print(
                    f"Transferring call {audio_interface.call_sid} to {HUMAN_OPERATOR_NUMBER}"
                )

                # Once Twilio switches TwiML, it will drop the media stream WebSocket.
                # Your finally block below will clean up the ElevenLabs conversation.
                return "Transferring you to a team member now."
            except Exception as e:
                print("Error transferring call:", e)
                return "I could not transfer you to a person right now."

        client_tools.register("transfer_to_human", transfer_to_human, is_async=True)
        client_tools.register(
            "schedule_appointment", schedule_appointment, is_async=True
        )

        # 2) Now that we have a streamSid, start the ElevenLabs conversation
        conversation = Conversation(
            client=eleven_labs_client,
            agent_id=ELEVEN_LABS_AGENT_ID,
            requires_auth=False,
            client_tools=client_tools,
            config=conv_config,
            audio_interface=audio_interface,
            callback_agent_response=lambda text: print(f"Agent: {text}"),
            callback_user_transcript=lambda text: print(f"User: {text}"),
        )

        conversation.start_session()
        print("Conversation started")

        # 3) Process the rest of the Twilio messages
        async for message in websocket.iter_text():
            if not message:
                continue
            await audio_interface.handle_twilio_message(json.loads(message))

    except WebSocketDisconnect:
        print("WebSocket disconnected")
    except Exception:
        print("Error occurred in WebSocket handler:")
        traceback.print_exc()
    finally:
        if conversation:
            try:
                conversation.end_session()
                conversation.wait_for_session_end()
                print("Conversation ended")
            except Exception:
                print("Error ending conversation session:")
                traceback.print_exc()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(router, host="0.0.0.0", port=5050)
