import os
import stripe
from dotenv import load_dotenv

load_dotenv()

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
STRIPE_PRICE_ID = os.getenv("STRIPE_PRICE_ID")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

if not STRIPE_SECRET_KEY:
    raise RuntimeError("STRIPE_SECRET_KEY not set")

stripe.api_key = STRIPE_SECRET_KEY
