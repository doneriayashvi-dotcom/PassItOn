# PassItOn — Full-Stack Campus Exchange Platform

PassItOn is a campus-tailored peer-to-peer exchange platform where verified college students can discover, offer, and request textbooks, tech gear, skills, ride shares, and hostel essentials.

---

## 🌟 Key Features

1. **Front Slide / Splash Screen**:
   - PassItOn logo with ambient glowing lights (`#6C5CE7` violet and `#FF7A59` coral).
   - **Timed front slide waiting exactly 2.8 seconds** with an animated loading progress bar.
2. **Student Email Verification**:
   - College email verification (`.edu` domain).
   - 6-digit OTP code entry with auto-focus digit navigation, clipboard paste support, and backend validation.
   - 1.8-second celebration screen upon verification.
3. **Database & Backend API**:
   - **SQLite relational database** (`PassItOn.db`) with tables for `users`, `listings`, `messages`, `otp_codes`, and `smartmatch_logs`.
   - **FastAPI backend** handling listings CRUD, student OTP authentication, inquiries, and stats.
4. **Smart Match AI Engine**:
   - Natural language query parser with intent detection (seeking vs offering) and campus item matching.
   - Contextual conversational response with structured clickable listing cards.
5. **Campus Feed & Filters**:
   - Live real-time search across titles, descriptions, and posters.
   - Category filtering (`Books`, `Skills`, `Rides & Gear`, `Tech`).
   - Type filtering (`All`, `Offering`, `Wanted`).
6. **Create & Contact**:
   - Modal sheet to create and publish campus listings in real-time.
   - Detail view with poster rating, time ago, and integrated direct inquiry messenger.
7. **Campus Messages / Inbox**:
   - View sent and received trade inquiries.

---

## 📁 Project Structure

```
PassItOn-app/
├── server/
│   ├── __init__.py
│   ├── database.py       # SQLite database initialization & query helpers
│   ├── models.py         # Pydantic request/response schemas
│   ├── ai_engine.py      # Smart Match AI semantic matching engine
│   ├── seed_data.py      # Initial campus seed listings & demo data
│   └── main.py           # FastAPI routes, REST endpoints, and static SPA mount
├── static/
│   ├── index.html        # HTML entry point with modern fonts & CDN scripts
│   ├── styles.css        # Animations (splashIn, splashBar, popIn, sheetUp)
│   └── app.js            # Complete React application & API client
├── requirements.txt      # Python dependencies
├── run.py                # Single-command launcher
└── README.md             # Project documentation
```

---

## 🚀 How to Run

### 1. Launch the Server
From the project directory:
```bash
python run.py
```

### 2. Access the Application
- **Web App**: Open your browser at [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger API Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Alternative Redoc Docs**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/auth/send-code` | Send 6-digit OTP to student email |
| `POST` | `/api/auth/verify-code` | Verify OTP and authenticate user |
| `GET` | `/api/listings` | Get listings (filters: `category`, `type`, `search`) |
| `GET` | `/api/listings/{id}` | Get listing by ID |
| `POST` | `/api/listings` | Create a new listing |
| `DELETE` | `/api/listings/{id}` | Delete a listing |
| `POST` | `/api/smartmatch` | AI conversational query matching |
| `POST` | `/api/messages` | Send a direct inquiry to a poster |
| `GET` | `/api/messages` | Get message history |
| `GET` | `/api/categories` | Get category definitions |
| `GET` | `/api/stats` | Get campus platform stats |
