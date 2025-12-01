from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.frontend import router as frontend_router  # api for frontend
from api.inbound import router as inbound_router  # api for inbound calls


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
app.include_router(frontend_router, prefix="/api/frontend", tags=["frontend"])
app.include_router(inbound_router, prefix="/api/inbound", tags=["inbound"])
