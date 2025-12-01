from fastapi import APIRouter, Request, HTTPException
import stripe
from app.stripe_config import STRIPE_WEBHOOK_SECRET

router = APIRouter(prefix="/stripe", tags=["stripe"])


@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(status_code=500, detail="webhook not configured")

    try:
        event = stripe.Webhook.construct_event(
            payload=payload,
            sig_header=sig_header,
            secret=STRIPE_WEBHOOK_SECRET,
        )
    except stripe.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    except Exception as e:
        print("Error parsing webhook:", e)
        raise HTTPException(status_code=400, detail="Webhook error")

    event_type = event["type"]
    data = event["data"]["object"]

    print(f"Received Stripe event: {event_type}")

    if event_type == "checkout.session.completed":
        # Paymet completed successfully
        # Here you can fetch session and customer, then mark the dealership as active
        session = data
        subscription_id = session.get("subscription")
        customer_id = session.get("customer")
        metadata = session.get("metadata", {})

    # Example: activate dealership in DB
    # dealership_id = metadata.get("dealership_id")
    # db.activate_subscription(dealership_id, subscription_id, customer_id)

    elif event_type == "customer.subscription.deleted":
        # Subscription cancelled
        subscription = data
        # find the dealership/user by subscription id and mark them inactive

    elif event_type == "invoice.payment_failed":
        # Payment failed; you might mark them as past_due or notify them
        pass

    # Return a 200 to acknowledge
    return {"status": "success"}
