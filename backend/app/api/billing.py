from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import SQLModel
import stripe
from app.stripe_config import STRIPE_PRICE_ID, FRONTEND_URL

router = APIRouter(prefix="/billing", tags=["billing"])


class CheckoutSessionRequest(SQLModel):
    lookup_key: str | None = None


class CheckoutSessionResponse(SQLModel):
    url: str


@router.post("/create-checkout-session", response_model=CheckoutSessionResponse)
async def create_checkout_session(body: CheckoutSessionRequest):
    """
    Creates a Stripe Checkout Session for a subscription or one-time purchase.
    """

    try:
        session = stripe.checkout.Session.create(
            mode="subscription",
            line_items=[
                {
                    "price": STRIPE_PRICE_ID,
                    "quantity": 1,
                }
            ],
            success_url=f"{FRONTEND_URL}/billing/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{FRONTEND_URL}/billing/cancelled",
            # If you have a logged in user, you can pass metadata to link this
            # to your own user/dealership in the webhook
            metadata={
                # "user_id": str(current_user.id),
                # "dealership_id": str(current_user.dealership_id),
            },
        )
        return CheckoutSessionResponse(url=session.url)
    except Exception as e:
        print("Error creating checkout session:", e)
        raise HTTPException(status_code=500, detail="unable to create checkout session")
