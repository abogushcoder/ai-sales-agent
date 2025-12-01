from sqlmodel import Field, SQLModel


class Dealership(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    timezone: str
    phone_main: str  # format(+16464014800)
    twilio_phone_number: str
    elevenlabs_inbound_agent_id: str
    elevenlabs_outbound_agent_id: str
    ai_lead_percentage: int
    subscription_tier: int
    agent_running: bool
