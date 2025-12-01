from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.frontend import router as frontend_router  # api for frontend
from api.inbound import router as inbound_router  # api for inbound calls
from api.billing import router as billing_router  # api for stripe payment
from app.api.stripe_webhook import router as stripe_webhook_router


app = FastAPI()

# CORS so your frontend (e.g. http://localhost:3000) can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers under clear prefixes
app.include_router(frontend_router, prefix="/api")
app.include_router(inbound_router, prefix="/api")
app.include_router(billing_router, prefix="/api")
app.include_router(stripe_webhook_router, prefix="/api")
