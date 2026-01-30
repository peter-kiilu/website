import urllib.request
import json
import urllib.error
import time

BASE_URL = "http://127.0.0.1:8000"

def test_root():
    try:
        with urllib.request.urlopen(f"{BASE_URL}/") as response:
            data = json.loads(response.read().decode())
            print(f"✅ Root endpoint: {data}")
    except Exception as e:
        print(f"❌ Root endpoint failed: {e}")

def test_register():
    url = f"{BASE_URL}/api/v1/users/register"
    # Random email to avoid unique constraint collisions on repeated runs
    import random
    rand_id = random.randint(1000, 9999)
    
    payload = {
        "email": f"test_user_{rand_id}@example.com",
        "password": "secretpassword",
        "full_name": "Test User",
        "student_id": "CS2024",
        "department": "Computer Science"
    }
    
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            print(f"✅ Registration successful for {payload['email']}")
            print(f"   User ID: {result.get('id')}")
            print(f"   Points: {result.get('points')}")
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"❌ Registration failed: {e.code} - {body}")
    except Exception as e:
        print(f"❌ Registration error: {e}")

if __name__ == "__main__":
    print("Testing Backend API...")
    time.sleep(1) # Give it a sec
    test_root()
    test_register()
