import sqlite3
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "rexchange.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        avatar_color TEXT DEFAULT '#2D46FF',
        rating REAL DEFAULT 5.0,
        is_verified INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # OTP codes table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS otp_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        code TEXT NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Listings table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS listings (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        poster TEXT NOT NULL,
        poster_email TEXT,
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        urgency TEXT DEFAULT '3_flexible',
        rating REAL DEFAULT 4.8,
        time_ago TEXT DEFAULT 'just now',
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Messages table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        listing_id TEXT NOT NULL,
        sender_email TEXT NOT NULL,
        receiver_name TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (listing_id) REFERENCES listings(id)
    )
    """)

    # SmartMatch query logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS smartmatch_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        query TEXT NOT NULL,
        matched_ids TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

# Database Helper Functions

def get_all_listings(category=None, listing_type=None, search=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = "SELECT * FROM listings WHERE status = 'active'"
    params = []

    if category and category != 'all':
        query += " AND category = ?"
        params.append(category)

    if listing_type and listing_type != 'all':
        query += " AND type = ?"
        params.append(listing_type)

    if search:
        query += " AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ? OR LOWER(poster) LIKE ?)"
        pattern = f"%{search.lower()}%"
        params.extend([pattern, pattern, pattern])

    # Sort by Urgency FIRST (1_asap -> 2_this_week -> 3_flexible), then newest first
    query += " ORDER BY urgency ASC, created_at DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_listing_by_id(listing_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM listings WHERE id = ?", (listing_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def create_listing(listing_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO listings (id, title, description, poster, poster_email, category, type, urgency, rating, time_ago, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        listing_data["id"],
        listing_data["title"],
        listing_data["description"],
        listing_data["poster"],
        listing_data.get("poster_email", "student@campus.edu"),
        listing_data["category"],
        listing_data["type"],
        listing_data.get("urgency", "3_flexible"),
        listing_data.get("rating", 5.0),
        listing_data.get("time_ago", "just now"),
        "active"
    ))
    conn.commit()
    conn.close()
    return get_listing_by_id(listing_data["id"])

def delete_listing(listing_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM listings WHERE id = ?", (listing_id,))
    conn.commit()
    conn.close()

def save_otp(email, code, expires_at):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO otp_codes (email, code, expires_at) VALUES (?, ?, ?)", (email, code, expires_at))
    conn.commit()
    conn.close()

def verify_otp(email, code):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM otp_codes 
        WHERE email = ? AND code = ? AND used = 0
        ORDER BY created_at DESC LIMIT 1
    """, (email, code))
    otp_record = cursor.fetchone()
    if otp_record:
        cursor.execute("UPDATE otp_codes SET used = 1 WHERE id = ?", (otp_record["id"],))
        
        # Ensure user exists in users table
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        if not user:
            name_part = email.split('@')[0].replace('.', ' ').title()
            cursor.execute("INSERT INTO users (email, name, is_verified) VALUES (?, ?, 1)", (email, name_part))
            cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
            user = cursor.fetchone()

        conn.commit()
        conn.close()
        return dict(user)
    conn.close()
    return None

def save_message(listing_id, sender_email, receiver_name, message):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO messages (listing_id, sender_email, receiver_name, message)
        VALUES (?, ?, ?, ?)
    """, (listing_id, sender_email, receiver_name, message))
    conn.commit()
    msg_id = cursor.lastrowid
    cursor.execute("SELECT * FROM messages WHERE id = ?", (msg_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row)

def get_messages(email=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    if email:
        cursor.execute("SELECT m.*, l.title as listing_title FROM messages m JOIN listings l ON m.listing_id = l.id WHERE sender_email = ? ORDER BY m.created_at DESC", (email,))
    else:
        cursor.execute("SELECT m.*, l.title as listing_title FROM messages m JOIN listings l ON m.listing_id = l.id ORDER BY m.created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_stats():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) as total_listings FROM listings WHERE status = 'active'")
    total_listings = cursor.fetchone()["total_listings"]
    cursor.execute("SELECT COUNT(*) as total_offers FROM listings WHERE type = 'offer' AND status = 'active'")
    total_offers = cursor.fetchone()["total_offers"]
    cursor.execute("SELECT COUNT(*) as total_wants FROM listings WHERE type = 'want' AND status = 'active'")
    total_wants = cursor.fetchone()["total_wants"]
    cursor.execute("SELECT COUNT(*) as total_users FROM users")
    total_users = cursor.fetchone()["total_users"]
    cursor.execute("SELECT COUNT(*) as total_messages FROM messages")
    total_messages = cursor.fetchone()["total_messages"]
    conn.close()
    return {
        "total_listings": total_listings,
        "total_offers": total_offers,
        "total_wants": total_wants,
        "total_users": max(total_users, 142),
        "total_messages": total_messages
    }
