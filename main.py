from fastapi import FastAPI, HTTPException, Body, Path
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
from backend.schemas import PatientDataSchema, NurseDataSchema
import os

load_dotenv()
app = FastAPI()

client = MongoClient(os.getenv("MONGODB_URI"), tlsAllowInvalidCertificates=True)
db = client["hospital"]
patients_collection = db["patients"]
nurses_collection = db["nurses"]
# db = client.nurse_db

class NurseBase(BaseModel):
    nurse_name: str
    nurseID: str
    email: str
    password: str

class NurseLogin(BaseModel):
    nurseID: str
    password: str

class NurseDataInput(BaseModel):
    nurse_id: int


@app.get("/")
async def hello_world():
    return {"message": "Hello, world!"}


@app.post("/patient-data-input")
async def patient_data_input(patient_data_input: PatientDataSchema = Body(...)):
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
    patients_collection.insert_one(patient_data_input.dict())

    # Return a success response.
    return {"message": "Patient data stored successfully.", "patient_data": patient_data_input.dict()}


@app.get("/nurse-patient-data/{nurse_id}")
async def nurse_patient_data(nurse_id: int = Path(...)):
    """Retrieves the patient data for a given nurse."""

    # Validate the nurse ID.
    if not isinstance(nurse_id, int):
        raise HTTPException(status_code=400, detail="Nurse ID must be an integer.")
    
    # Get the nurse document from the nurses collection.
    nurse = nurses_collection.find_one({"nurse_id": nurse_id})

    # If the nurse document does not exist, raise an exception.
    if nurse is None:
        raise HTTPException(status_code=404, detail="Nurse not found.")
    
    if not nurse.drip_started:
        return ({"message", "No patient with active drip, click the button to start a drip.\n"})
    
    return {"message": nurse.patient_document}


@app.get("/get-patient")
async def patient_data(nurse_id: int = Path(...)):
    """Retrieves the patient data for a given nurse."""

    # Validate the nurse ID.
    if not isinstance(nurse_id, int):
        raise HTTPException(status_code=400, detail="Nurse ID must be an integer.")

    # Get the nurse document from the nurses collection.
    nurse_document = nurses_collection.find_one({"_id": nurse_id})

    # If the nurse document does not exist, raise an exception.
    if nurse_document is None:
        raise HTTPException(status_code=404, detail="Nurse not found.")

    # Get the patient IDs from the nurse document.
    patient_ids = nurse_document["patient_ids"]

    # Get the patient IDs from the nurse document.
    patient_ids = nurse_document["patient_ids"]

    # Get the patient data from the patients collection.
    patient_data = []
    for patient_id in patient_ids:
        patient_document = patients_collection.find_one({"patient_id": patient_id})

        # If the patient document does not exist, raise an exception.
        if patient_document is None:
            raise HTTPException(status_code=404, detail="Patient not found.")

        # Add the patient data to the list.
        patient_data.append({
            "patient_name": patient_document["patient_name"],
            "patient_id": patient_id,
            "room_number": patient_document["room_number"],
            "date_of_birth": patient_document["date_of_birth"]
        })

    # Return the patient data.
    return patient_data



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
