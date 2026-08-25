from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any

class SendOtpRequest(BaseModel):
    email: str

class VerifyOtpRequest(BaseModel):
    email: str
    code: str

class CreateListingRequest(BaseModel):
    title: str = Field(..., min_length=2)
    description: str = Field(..., min_length=2)
    category: str
    type: str  # 'offer' | 'want'
    urgency: str = "3_flexible" # 1_asap, 2_this_week, 3_flexible
    poster: Optional[str] = "You"
    poster_email: Optional[str] = "student@campus.edu"

class SendMessageRequest(BaseModel):
    listing_id: str
    sender_email: Optional[str] = "student@campus.edu"
    receiver_name: str
    message: str

class SmartMatchRequest(BaseModel):
    query: str
    user_email: Optional[str] = None
