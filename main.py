from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

client = MongoClient(os.getenv("MONGODB_URI"), tlsAllowInvalidCertificates=True)
db = client["hospital"]
collection = db["patients"]
# db = client.nurse_db

class NurseBase(BaseModel):
    nurse_name: str
    nurseID: str
    email: str
    password: str

class NurseLogin(BaseModel):
    nurseID: str
    password: str

class PatientDataInput(BaseModel):
    patient_name: str
    patient_id: int
    room_number: int
    date_of_birth: str


@app.get("/")
async def hello_world():
    return {"message": "Hello, world!"}

@app.post("/patient-data-input")
async def patient_data_input(patient_data_input: PatientDataInput = Body(...)):
    """Stores patient data in MongoDB."""

    # Validate the patient data input.
    if patient_data_input.patient_name is None or patient_data_input.patient_name == "":
        raise HTTPException(status_code=400, detail="Patient name is required.")
    if patient_data_input.patient_id is None or patient_data_input.patient_id == 0:
        raise HTTPException(status_code=400, detail="Patient ID is required.")
    if patient_data_input.room_number is None or patient_data_input.room_number == 0:
        raise HTTPException(status_code=400, detail="Room number is required.")
    if patient_data_input.date_of_birth is None or patient_data_input.date_of_birth == "":
        raise HTTPException(status_code=400, detail="Date of birth is required.")

    # Insert the patient data into MongoDB.
    collection.insert_one(patient_data_input.dict())

    # Return a success response.
    return {"message": "Patient data stored successfully."}

# @app.post("/signup/")
# async def create_nurse(nurse: NurseBase):
#     if db.nurses.find_one({"nurseID": nurse.nurseID}):
#         raise HTTPException(status_code=400, detail="NurseID already registered")
#     db.nurses.insert_one(nurse.dict())
#     return {"message": "Nurse created successfully"}

# @app.post("/login/")
# async def login_nurse(nurse: NurseLogin):
#     nurse_data = db.nurses.find_one({"nurseID": nurse.nurseID, "password": nurse.password})
#     if nurse_data:
#         return {"message": "Login successful"}
#     raise HTTPException(status_code=400, detail="Invalid credentials")

# @app.post("/patient-data-input/")