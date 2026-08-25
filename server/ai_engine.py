import re
from .database import get_all_listings, get_db_connection

CATEGORY_SYNONYMS = {
    "books": ["book", "textbook", "notes", "paper", "pdf", "handout", "manual", "exam", "signals", "chemistry", "physics", "calculus", "dld", "logic"],
    "tech": ["tech", "electronics", "laptop", "arduino", "raspberry", "calculator", "screen", "keyboard", "mouse", "camera", "dslr", "lens", "cable", "gadget", "charger", "hackathon"],
    "skills": ["skill", "lesson", "teach", "mentor", "tutoring", "tutor", "guitar", "piano", "code", "coding", "python", "javascript", "react", "web", "cad", "solidworks", "dsa"],
    "rides": ["ride", "cycle", "bicycle", "bike", "scooter", "carpool", "metro", "travel", "transport", "tent", "gear", "lock", "helmet"]
}

STOP_WORDS = {"i", "me", "my", "we", "our", "you", "your", "he", "she", "it", "they", "a", "an", "the", "and", "or", "but", "if", "for", "with", "in", "on", "at", "to", "from", "by", "about", "as", "into", "like", "through", "after", "over", "between", "out", "against", "during", "without", "before", "under", "around", "among", "is", "am", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did", "can", "could", "will", "would", "shall", "should", "may", "might", "must", "want", "need", "looking", "look", "get", "find", "search", "give", "giving", "offer", "offering", "trade", "swap", "sell", "buy"}

def extract_keywords(text: str):
    words = re.findall(r'\b[a-zA-Z0-9_-]+\b', text.lower())
    return [w for w in words if w not in STOP_WORDS and len(w) > 1]

def match_query(query: str):
    q_lower = query.lower()
    keywords = extract_keywords(query)
    
    # Intent detection
    is_seeking = any(k in q_lower for k in ["need", "want", "looking for", "require", "borrow", "buy", "find", "seeking"])
    is_offering = any(k in q_lower for k in ["offer", "offering", "selling", "give", "can teach", "available", "renting", "swap", "trade"])
    
    # Target listing type to recommend:
    # If user says "I need X", we should search for "offer" listings of X
    # If user says "I am offering X", we should search for "want" listings of X
    preferred_type = "offer" if is_seeking else ("want" if is_offering else None)
    
    # Detect category hint
    detected_category = None
    for cat, syns in CATEGORY_SYNONYMS.items():
        if any(s in q_lower for s in syns):
            detected_category = cat
            break

    # Fetch all active listings
    listings = get_all_listings()
    scored_listings = []

    for listing in listings:
        score = 0
        l_title = listing["title"].lower()
        l_desc = listing["description"].lower()
        l_cat = listing["category"]
        l_type = listing["type"]

        # Category match bonus
        if detected_category and l_cat == detected_category:
            score += 25

        # Type alignment bonus
        if preferred_type and l_type == preferred_type:
            score += 15

        # Keyword matches
        for kw in keywords:
            if kw in l_title:
                score += 35
            elif kw in l_desc:
                score += 15

        # Substring/phrases match
        if len(query.strip()) > 3 and query.strip().lower() in l_title:
            score += 50
        elif len(query.strip()) > 3 and query.strip().lower() in l_desc:
            score += 30

        if score > 0:
            scored_listings.append((score, listing))

    # Sort descending by score
    scored_listings.sort(key=lambda x: x[0], reverse=True)
    top_matches = [item[1] for item in scored_listings[:3]]

    # If no high-confidence matches, pick 2 most recent active listings in detected category or overall
    if not top_matches:
        if detected_category:
            fallback = [l for l in listings if l["category"] == detected_category][:2]
            top_matches = fallback if fallback else listings[:2]
        else:
            top_matches = listings[:2]

    # Generate conversational AI response
    if len(top_matches) > 0 and scored_listings:
        matched_titles = ", ".join([f'"{m["title"]}"' for m in top_matches])
        ai_reply = f"I scanned campus listings and found {len(top_matches)} great match{'es' if len(top_matches) > 1 else ''} for your request! Check out {matched_titles} below. You can tap any card to view details or message the student."
    else:
        ai_reply = f"I couldn't find an exact direct match for \"{query}\" yet, but here are the closest active listings on campus right now. You can also post a 'Wanted' listing in one tap to notify classmates!"

    # Log query to DB
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        matched_ids_str = ",".join([str(m["id"]) for m in top_matches])
        cursor.execute("INSERT INTO smartmatch_logs (query, matched_ids) VALUES (?, ?)", (query, matched_ids_str))
        conn.commit()
        conn.close()
    except Exception as e:
        print("[SmartMatch Log Error]", e)

    return {
        "reply": ai_reply,
        "matches": top_matches,
        "detected_category": detected_category,
        "query": query
    }
