from pymongo import MongoClient
import os
import random
from datetime import datetime, timedelta

# MongoDB connection settings
client = MongoClient('mongodb+srv://tirthofficials:xK0W7XtI7JLWfhJz@cluster0.dvejt5r.mongodb.net/?retryWrites=true&w=majority', tlsAllowInvalidCertificates=True)
database = client["hospital"]
patients_collection = database["patients"]
nurses_collection = database["nurses"]

# Sample patient data
sample_patients = [
    {"name": "Tom", "date_of_birth": "1990-01-15", "room_no": 101, "hours_since_last_meal": 4},
    {"name": "Jonathan", "date_of_birth": "1985-05-20", "room_no": 102, "hours_since_last_meal": 6},
    {"name": "Spencer", "date_of_birth": "1995-09-10", "room_no": 103, "hours_since_last_meal": 3},
    {"name": "Nick", "date_of_birth": "1980-03-25", "room_no": 104, "hours_since_last_meal": 5},
    {"name": "Julia", "date_of_birth": "1998-07-30", "room_no": 105, "hours_since_last_meal": 2},
]

sample_nurses = [
    {"nurse_id": 1, "first_name": "Binh", "last_name": "Nguyen", "email": "bnguyen@gmail.com", "password": "hophacks", "patient_ids": []},
]

# Function to add a patient to the database
def add_patient(patient_data):
    patients_collection.insert_one(patient_data)

# Add the sample patients to the database
for patient in sample_patients:
    # Generate a unique ID for each patient (you can use ObjectId or any other method)
    patient["patient_id"] = random.randint(1000, 9999)
    sample_nurses[0]['patient_ids'].append(patient["patient_id"])

    patient["titration_state"] = None
    
    # Convert the date_of_birth string to a datetime object
    patient["date_of_birth"] = datetime.strptime(patient["date_of_birth"], "%Y-%m-%d")

    add_patient(patient)

# Function to add a nurse to the database
def add_nurse(nurse_data):
    nurses_collection.insert_one(nurse_data)

for nurse in sample_nurses:
    add_nurse(nurse)



# Close the MongoDB connection
client.close()