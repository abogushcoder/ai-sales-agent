from sqlmodel import Field, SQLModel


class ScheduleAppointmentPayload(SQLModel, table=True):
    customer_name: str = Field(..., description="Full name of the customer")
    phone_number: str = Field(..., description="E.164 format if possible")
    appointment_type: str = Field(..., description='"test_drive", "service", etc.')
    date: str = Field(..., description="YYYY-MM-DD in dealership local time")
    time: str = Field(..., description="HH:MM 24h time, dealership local time")
    timezone: str = Field(..., description="IANA timezone, e.g. America/New_York")
    vehicle: str | None = None
    notes: str | None = None
