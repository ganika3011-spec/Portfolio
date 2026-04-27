import json
import requests
import os
import sys

# CONFIGURATION
LOCAL_DATA_FILE = 'local_data.json'
RENDER_API_URL = 'https://portfolio-o7ii.onrender.com/api/seed/'

def get_secret_key():
    # Try to get SECRET_KEY from the backend/settings.py
    try:
        with open('backend/settings.py', 'r') as f:
            for line in f:
                if 'SECRET_KEY' in line and '=' in line and 'os.getenv' not in line:
                    return line.split('=')[1].strip().strip("'").strip('"')
    except:
        pass
    return None

def sync():
    if not os.path.exists(LOCAL_DATA_FILE):
        print(f"Error: {LOCAL_DATA_FILE} not found. Run 'python manage.py dumpdata core --indent 2 > local_data.json' first.")
        return

    secret_key = get_secret_key()
    if not secret_key:
        secret_key = input("Please enter your Django SECRET_KEY: ")

    print(f"Reading data from {LOCAL_DATA_FILE}...")
    with open(LOCAL_DATA_FILE, 'r') as f:
        data = json.load(f)

    print(f"Sending data to {RENDER_API_URL}...")
    headers = {
        'X-Secret-Key': secret_key,
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.post(RENDER_API_URL, json=data, headers=headers)
        if response.status_code == 200:
            print("Successfully synced! 🚀")
            print(response.json().get('message'))
        else:
            print(f"Failed to sync. Status: {response.status_code}")
            print(response.json())
    except Exception as e:
        print(f"Error connecting to Render: {e}")

if __name__ == "__main__":
    sync()
