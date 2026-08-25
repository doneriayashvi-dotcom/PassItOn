from .database import get_db_connection

SEED_LISTINGS = [
    {
        "id": "1",
        "title": "Signals & Systems (3rd Ed, Oppenheim)",
        "description": "Barely used, zero pen marks or highlighting. Perfect for EC-201 and mid-sem prep.",
        "poster": "Yashvi P.",
        "poster_email": "yashvi.p@campus.edu",
        "category": "books",
        "type": "offer",
        "urgency": "3_flexible",
        "rating": 4.8,
        "time_ago": "2h ago"
    },
    {
        "id": "2",
        "title": "Need: Arduino Uno R3 & Breadboard",
        "description": "For upcoming 36-hour weekend hackathon. Need sensor kit as well if available, will return safely on Monday.",
        "poster": "Rohan K.",
        "poster_email": "rohan.k@campus.edu",
        "category": "tech",
        "type": "want",
        "urgency": "1_asap",
        "rating": 4.5,
        "time_ago": "4h ago"
    },
    {
        "id": "3",
        "title": "Acoustic Guitar Lessons (30 min/wk)",
        "description": "Beginner-friendly fingerstyle and chords. Willing to trade for Python / DSA tutoring or coffee!",
        "poster": "Meera S.",
        "poster_email": "meera.s@campus.edu",
        "category": "skills",
        "type": "offer",
        "urgency": "3_flexible",
        "rating": 5.0,
        "time_ago": "1d ago"
    },
    {
        "id": "4",
        "title": "Hostel Bicycle (Hero Sprint, 21-Speed)",
        "description": "Moving off-campus next semester. Well-oiled, smooth brakes, heavy-duty combination cable lock included.",
        "poster": "Arjun V.",
        "poster_email": "arjun.v@campus.edu",
        "category": "rides",
        "type": "offer",
        "urgency": "2_this_week",
        "rating": 4.6,
        "time_ago": "1d ago"
    },
    {
        "id": "5",
        "title": "Digital Logic Design handwritten notes",
        "description": "Complete semester compiled notes with previous 5 years exam solutions marked. Available in PDF and spiral print.",
        "poster": "Sneha R.",
        "poster_email": "sneha.r@campus.edu",
        "category": "books",
        "type": "offer",
        "urgency": "3_flexible",
        "rating": 4.9,
        "time_ago": "2d ago"
    },
    {
        "id": "6",
        "title": "Need: DSLR / Mirrorless Camera for Fest Shoot",
        "description": "Need Sony Alpha or Canon DSLR for cultural night coverage (6 PM - 11 PM). Handled with utmost care.",
        "poster": "Kabir M.",
        "poster_email": "kabir.m@campus.edu",
        "category": "tech",
        "type": "want",
        "urgency": "1_asap",
        "rating": 4.3,
        "time_ago": "3d ago"
    },
    {
        "id": "7",
        "title": "TI-84 Plus CE Graphing Calculator",
        "description": "Color screen, rechargeable battery with USB cable. Approved for calculus, linear algebra, and SAT/GRE tests.",
        "poster": "Ananya D.",
        "poster_email": "ananya.d@campus.edu",
        "category": "tech",
        "type": "offer",
        "urgency": "2_this_week",
        "rating": 4.9,
        "time_ago": "3d ago"
    },
    {
        "id": "8",
        "title": "Weekend Carpool: Campus to Metro Station",
        "description": "Driving to Central Metro every Friday 5:30 PM and returning Sunday 8:00 PM. 2 seats open, split fuel.",
        "poster": "Devansh T.",
        "poster_email": "devansh.t@campus.edu",
        "category": "rides",
        "type": "offer",
        "urgency": "2_this_week",
        "rating": 4.7,
        "time_ago": "4d ago"
    },
    {
        "id": "9",
        "title": "Need: Organic Chemistry Morrison & Boyd",
        "description": "Looking for 6th/7th edition textbook for Chem-102. Can swap with Engineering Physics or pay token amount.",
        "poster": "Pooja B.",
        "poster_email": "pooja.b@campus.edu",
        "category": "books",
        "type": "want",
        "urgency": "3_flexible",
        "rating": 4.6,
        "time_ago": "5d ago"
    },
    {
        "id": "10",
        "title": "Full Stack Web Dev Mentorship",
        "description": "Final year CS student offering project guidance, resume reviews, and debugging help for junior teams.",
        "poster": "Vikram N.",
        "poster_email": "vikram.n@campus.edu",
        "category": "skills",
        "type": "offer",
        "urgency": "3_flexible",
        "rating": 5.0,
        "time_ago": "5d ago"
    }
]

SEED_USERS = [
    {"email": "student@campus.edu", "name": "You (Campus Member)", "rating": 5.0, "is_verified": 1},
    {"email": "yashvi.p@campus.edu", "name": "Yashvi P.", "rating": 4.8, "is_verified": 1},
    {"email": "rohan.k@campus.edu", "name": "Rohan K.", "rating": 4.5, "is_verified": 1},
    {"email": "meera.s@campus.edu", "name": "Meera S.", "rating": 5.0, "is_verified": 1},
    {"email": "arjun.v@campus.edu", "name": "Arjun V.", "rating": 4.6, "is_verified": 1},
    {"email": "sneha.r@campus.edu", "name": "Sneha R.", "rating": 4.9, "is_verified": 1},
    {"email": "kabir.m@campus.edu", "name": "Kabir M.", "rating": 4.3, "is_verified": 1},
]

def seed_database():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if listings already populated
    cursor.execute("SELECT COUNT(*) as count FROM listings")
    count = cursor.fetchone()["count"]

    if count == 0:
        for user in SEED_USERS:
            cursor.execute("""
                INSERT OR IGNORE INTO users (email, name, rating, is_verified)
                VALUES (?, ?, ?, ?)
            """, (user["email"], user["name"], user["rating"], user["is_verified"]))

        for item in SEED_LISTINGS:
            cursor.execute("""
                INSERT INTO listings (id, title, description, poster, poster_email, category, type, urgency, rating, time_ago, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
            """, (
                item["id"],
                item["title"],
                item["description"],
                item["poster"],
                item["poster_email"],
                item["category"],
                item["type"],
                item["urgency"],
                item["rating"],
                item["time_ago"]
            ))

        # Sample initial messages
        cursor.execute("""
            INSERT INTO messages (listing_id, sender_email, receiver_name, message)
            VALUES 
            ('1', 'student@campus.edu', 'Yashvi P.', 'Hey Yashvi, is Signals & Systems textbook still available for EC-201?'),
            ('3', 'student@campus.edu', 'Meera S.', 'Hi Meera! I would love to trade Python lessons for guitar lessons!')
        """)

        conn.commit()
        print("[SEED] Successfully seeded PassItOn campus listings, users, and initial messages.")
    
    conn.close()
