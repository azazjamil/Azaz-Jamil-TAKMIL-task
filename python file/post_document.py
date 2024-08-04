import requests
import json

url = 'http://localhost:4000/schools'
headers = {'Content-Type': 'application/json'}
data = {
    "name": "School-A",
    "status": "old",
    "startTime": "8:30am",
    "endTime": "1:30pm",
    "shift": "Morning",
    "address": {
        "town": "Nehar Kot",
        "tehsil": "Barkhan",
        "district": "Barkhan",
        "state": "Balochistan",
        "address": "address-1",
        "latitude": 29.79,
        "longitude": 69.47
    },
    "hasProjector": False,
    "hasLaptop": False,
    "organization": {
        "name": "publicschools"
    }
}

response = requests.post(url, headers=headers, data=json.dumps(data))
print(response.status_code)
print(response.json())
