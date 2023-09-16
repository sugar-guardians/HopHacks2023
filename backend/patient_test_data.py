from pymongo import MongoClient
import os
import random
from datetime import datetime, timedelta

# MongoDB connection settings
client = MongoClient('mongodb+srv://tirthofficials:xK0W7XtI7JLWfhJz@cluster0.dvejt5r.mongodb.net/?retryWrites=true&w=majority', tlsAllowInvalidCertificates=True)
database = client["hospital"]
patients_collection = database["patients"]

# Sample patient data
sample_patients = [
    {"name": "Patient 1", "date_of_birth": "1990-01-15", "room_no": 101, "hours_since_last_meal": 4},
    {"name": "Patient 2", "date_of_birth": "1985-05-20", "room_no": 102, "hours_since_last_meal": 6},
    {"name": "Patient 3", "date_of_birth": "1995-09-10", "room_no": 103, "hours_since_last_meal": 3},
    {"name": "Patient 4", "date_of_birth": "1980-03-25", "room_no": 104, "hours_since_last_meal": 5},
    {"name": "Patient 5", "date_of_birth": "1998-07-30", "room_no": 105, "hours_since_last_meal": 2},
]

# Function to add a patient to the database
def add_patient(patient_data):
    patients_collection.insert_one(patient_data)

# Add the sample patients to the database
for patient in sample_patients:
    # Generate a unique ID for each patient (you can use ObjectId or any other method)
    patient["patient_id"] = str(random.randint(1000, 9999))

    patient["titration_state"] = None
    
    # Convert the date_of_birth string to a datetime object
    patient["date_of_birth"] = datetime.strptime(patient["date_of_birth"], "%Y-%m-%d")

    add_patient(patient)

# Close the MongoDB connection
client.close()