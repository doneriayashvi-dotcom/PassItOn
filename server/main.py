import os
import random
import time
from datetime import datetime, timedelta
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

from .database import (
    init_db,
    get_all_listings,
    get_listing_by_id,
    create_listing,
    delete_listing,
    save_otp,
    verify_otp,
    save_message,
    get_messages,
    get_stats
)
from .seed_data import seed_database
from .models import (
    SendOtpRequest,
    VerifyOtpRequest,
    CreateListingRequest,
    SendMessageRequest,
    SmartMatchRequest
)
from .ai_engine import match_query

# Lifespan event to initialize DB & seeds
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("[INIT] Initializing SQLite database...")
    init_db()
    seed_database()
    print("[READY] PassItOn API is live!")
    yield
    print("[SHUTDOWN] PassItOn API stopped.")

app = FastAPI(title="PassItOn API", version="1.0.0", lifespan=lifespan)

# Allow CORS for development & API access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "static")

# ----------------- API ENDPOINTS ----------------- #

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "PassItOn API", "timestamp": time.time()}

@app.get("/api/categories")
def get_categories():
    return [
        {"id": "books", "label": "Books", "icon": "BookOpen", "description": "Textbooks, notes, lab manuals"},
        {"id": "skills", "label": "Skills", "icon": "Wrench", "description": "Tutoring, coding, music, design"},
        {"id": "rides", "label": "Rides & Gear", "icon": "Bike", "description": "Cycles, carpools, outdoor gear"},
        {"id": "tech", "label": "Tech", "icon": "Laptop", "description": "Electronics, calculators, cameras"}
    ]

@app.get("/api/stats")
def get_campus_stats():
    return get_stats()

# Authentication & OTP Endpoints
@app.post("/api/auth/send-code")
def send_verification_code(req: SendOtpRequest):
    email = req.email.strip().lower()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Invalid email address")
    
    # Generate 6-digit OTP code (fixed default demo code or random)
    code = f"{random.randint(100000, 999999)}"
    expires_at = datetime.now() + timedelta(minutes=15)
    
    save_otp(email, code, expires_at)
    
    # In production, send email via SMTP/Resend. In demo/local, return code in response for smooth testing!
    return {
        "success": True,
        "message": f"Verification code sent to {email}",
        "email": email,
        "demo_code": code  # Provided for convenience in demo
    }

@app.post("/api/auth/verify-code")
def verify_student_code(req: VerifyOtpRequest):
    email = req.email.strip().lower()
    code = req.code.strip()
    
    # Accept generated code or fallback test code '123456' for instant demo ease
    user = verify_otp(email, code)
    if not user and code == "123456":
        # Auto-create verified demo user
        user = verify_otp(email, code)
        if not user:
            from .database import get_db_connection
            conn = get_db_connection()
            cursor = conn.cursor()
            name_part = email.split('@')[0].replace('.', ' ').title()
            cursor.execute("INSERT OR IGNORE INTO users (email, name, is_verified) VALUES (?, ?, 1)", (email, name_part))
            cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
            user = dict(cursor.fetchone())
            conn.commit()
            conn.close()

    if not user:
        raise HTTPException(status_code=400, detail="Invalid or expired verification code")

    return {
        "success": True,
        "user": user,
        "token": f"rex_token_{user['id']}_{int(time.time())}"
    }

# Listings Endpoints
@app.get("/api/listings")
def list_all_listings(
    category: str = Query(None),
    type: str = Query(None),
    search: str = Query(None)
):
    return get_all_listings(category=category, listing_type=type, search=search)

@app.get("/api/listings/{listing_id}")
def get_single_listing(listing_id: str):
    listing = get_listing_by_id(listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listing

@app.post("/api/listings", status_code=status.HTTP_201_CREATED)
def post_new_listing(req: CreateListingRequest):
    new_id = str(int(time.time() * 1000))
    listing_data = {
        "id": new_id,
        "title": req.title.strip(),
        "description": req.description.strip(),
        "category": req.category,
        "type": req.type,
        "poster": req.poster or "You",
        "poster_email": req.poster_email or "student@campus.edu",
        "rating": 5.0,
        "time_ago": "just now"
    }
    created = create_listing(listing_data)
    return created

@app.delete("/api/listings/{listing_id}")
def remove_listing(listing_id: str):
    listing = get_listing_by_id(listing_id)
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    delete_listing(listing_id)
    return {"success": True, "message": "Listing removed"}

# Smart Match AI Endpoint
@app.post("/api/smartmatch")
def smart_match_endpoint(req: SmartMatchRequest):
    query = req.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    result = match_query(query)
    return result

# Messaging Endpoints
@app.post("/api/messages")
def send_inquiry_message(req: SendMessageRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    msg = save_message(
        listing_id=req.listing_id,
        sender_email=req.sender_email or "student@campus.edu",
        receiver_name=req.receiver_name,
        message=req.message.strip()
    )
    return {"success": True, "message": msg}

@app.get("/api/messages")
def list_messages(email: str = Query(None)):
    return get_messages(email=email)

# ----------------- STATIC FRONTEND SERVING ----------------- #

if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    # Check if a specific static file exists
    file_path = os.path.join(STATIC_DIR, full_path)
    if full_path and os.path.isfile(file_path):
        return FileResponse(file_path)
    # Default to index.html for Single Page App routing
    index_file = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return JSONResponse({"message": "PassItOn API is running. Static files are being configured."})
