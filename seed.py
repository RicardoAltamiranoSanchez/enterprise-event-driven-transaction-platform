import urllib.request
import urllib.parse
import urllib.error
import json
import random
import uuid
import time

BASE_URL = "http://localhost:8000"
USERNAME = "admin"
PASSWORD = "password123"

def seed_data():
    print("Authenticating...")
    
    # Login expects form data
    data = urllib.parse.urlencode({'username': USERNAME, 'password': PASSWORD}).encode('utf-8')
    req = urllib.request.Request(f"{BASE_URL}/auth/login", data=data)
    
    try:
        with urllib.request.urlopen(req) as response:
            resp_data = json.loads(response.read().decode('utf-8'))
            token = resp_data.get("access_token")
    except urllib.error.URLError as e:
        print("Login failed:", e)
        return
        
    headers = {
        "Authorization": f"Bearer {token}", 
        "Content-Type": "application/json"
    }
    
    tipos = ["compra", "venta", "transferencia"]
    
    for i in range(15):
        monto = round(random.uniform(10.0, 5000.0), 2)
        tipo = random.choice(tipos)
        payload = {
            "user_id": str(uuid.uuid4()),
            "monto": monto,
            "tipo": tipo
        }
        
        json_data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(f"{BASE_URL}/transactions/async-process", data=json_data, headers=headers)
        
        try:
            with urllib.request.urlopen(req) as response:
                print(f"Created transaction {i+1}: {tipo} ${monto}")
        except urllib.error.URLError as e:
            print(f"Failed to create transaction: {e}")
        
        time.sleep(0.5)

if __name__ == "__main__":
    seed_data()
