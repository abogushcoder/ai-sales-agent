from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/frontend", tags=["frontend"])

# You would derive dealership_id from auth; here we fake it
# TODO: setup auth for this
DEALERSHIP_ID = "demo-dealership"


class AgentStatus(BaseModel):
    running: bool


class LeadAllocation(BaseModel):
    percentage: int  # 0, 25, 50, 75, 100


class AnalyticsSummary(BaseModel):
    total_calls: int
    successful_calls: int
    nurture_count: int


class NurtureLead(BaseModel):
    id: str
    name: str
    phone: str
    stage: str
    last_contacted: str


# In reality these would be pulled from a DB
agent_state = {DEALERSHIP_ID: AgentStatus(running=False)}
lead_allocation_state = {DEALERSHIP_ID: LeadAllocation(percentage=50)}
dummy_nurture_leads = [
    NurtureLead(
        id="lead_1",
        name="Alex Johnson",
        phone="+15551234567",
        stage="Follow-up",
        last_contacted="2025-11-28",
    ),
    NurtureLead(
        id="lead_2",
        name="Maria Gomez",
        phone="+15557654321",
        stage="Warm",
        last_contacted="2025-11-27",
    ),
]


@router.get("/agent/status", response_model=AgentStatus)
async def get_agent_status():
    return agent_state[DEALERSHIP_ID]


@router.post("/agent/status", response_model=AgentStatus)
async def set_agent_status(status: AgentStatus):
    # Here you would start/stop background tasks, webhooks, etc
    agent_state[DEALERSHIP_ID] = status
    return status


@router.get("/agent/lead-allocation", response_model=LeadAllocation)
async def get_lead_allocation():
    return lead_allocation_state[DEALERSHIP_ID]


@router.post("/agent/lead-allocation", response_model=LeadAllocation)
async def set_lead_allocation(config: LeadAllocation):
    if config.percentage not in (0, 25, 50, 75, 100):
        raise HTTPException(
            status_code=400, detail="Percentage must be 0, 25, 50, 75, or 100"
        )
    lead_allocation_state[DEALERSHIP_ID] = config
    return config


@router.get("/analytics/summary", response_model=AnalyticsSummary)
async def analytics_summary():
    # Replace with real queries
    return AnalyticsSummary(
        total_calls=120,
        successful_calls=48,
        nurture_count=len(dummy_nurture_leads),
    )


@router.get("/analytics/nurture-leads", response_model=List[NurtureLead])
async def analytics_nurture_leads():
    return dummy_nurture_leads


@router.delete("/analytics/nurture-leads/{lead_id}")
async def remove_from_nurture(lead_id: str):
    global dummy_nurture_leads
    before = len(dummy_nurture_leads)
    dummy_nurture_leads = [l for l in dummy_nurture_leads if l.id != lead_id]
    if len(dummy_nurture_leads) == before:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"status": "ok"}
