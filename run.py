import uvicorn
import os
import sys
import socket

def get_local_ip():
    try:
        # Create a socket that doesn't actually connect, just to get the preferred outgoing IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception:
        return "127.0.0.1"

if __name__ == "__main__":
    # Ensure current directory is on python path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    if current_dir not in sys.path:
        sys.path.insert(0, current_dir)

    local_ip = get_local_ip()

    print("=" * 60)
    print(" [*] Starting PassItOn Full-Stack Application")
    print(f" [*] Local Address (PC):    http://127.0.0.1:8000")
    print(f" [*] Network Address (Phone): http://{local_ip}:8000")
    print(" [*] API Docs:                http://127.0.0.1:8000/docs")
    print(" [*] Database:                PassItOn.db (SQLite)")
    print("=" * 60)

    # Listen on 0.0.0.0 so external devices on the same WiFi can access
    uvicorn.run("server.main:app", host="0.0.0.0", port=8000, reload=False)
