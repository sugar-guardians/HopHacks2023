from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Body, Path
from pydantic import BaseModel
from pymongo import MongoClient
import os

load_dotenv()   # load environment variables from .env
app = FastAPI()

client = MongoClient(os.getenv("MONGODB_URI"), tlsAllowInvalidCertificates=True)
db = client["hospital"]
patients_collection = db["patients"]
nurses_collection = db["nurses"]


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

class PatientDataSchema(BaseModel):
    patient_name: str
    patient_id: int
    room_number: int
    date_of_birth: str

def make_titration_matrix():
    # Given col_1 values
    col_1 = [0, 0.1, 0.2, 0.3, 0.3, 0.4, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.4, 1.7, 2.1, 2.5, 3, 3.6, 4.4]

    # Initialize an empty matrix
    titration_matrix = []

    # Iterate through col_1 values
    for val in col_1:
        # Initialize a row for the current col_1 value
        row = [val]

        # Calculate and append col_2 to col_16 values
        for i in range(2, 17):
            row.append(round(val * i, 2))

        # Append the row to the matrix
        titration_matrix.append(row)

    titration_matrix[6] = [0.4, 0.9, 1.3, 1.8, 2.2, 2.7, 3.1, 3.6, 4, 4.5, 4.9, 5.4, 5.9, 6.4, 6.9, 7.4]
    titration_matrix[4] = [0.3, 0.7, 1, 1.4, 1.7, 2.1, 2.4, 2.8, 3.2, 3.5, 3.8, 4.1, 4.4, 4.7, 5, 5.3]
    return titration_matrix

TITRATION_MATRIX = make_titration_matrix()

class NurseDataSchema(BaseModel):
    nurse_id: int
    nurse_name: str
    patient_id: int
    drip_started: bool


def BG_range_to_titration_matrix_row(blood_glucose_measurement):
    # given a blood glucose measurement, output
    if blood_glucose_measurement > 450:
        return 20
    elif 385 <= blood_glucose_measurement <= 450:
        return 19
    elif 334 <= blood_glucose_measurement <= 384:
        return 18
    elif 290 <= blood_glucose_measurement <= 333:
        return 17
    elif 251 <= blood_glucose_measurement <= 289:
        return 16
    elif 217 < blood_glucose_measurement <= 250:
        return 15
    elif 188 <= blood_glucose_measurement <= 216:
        return 14
    elif 163 <= blood_glucose_measurement <= 187:
        return 13
    elif 151 <= blood_glucose_measurement <= 162:
        return 12
    elif 141 <= blood_glucose_measurement <= 150:
        return 11
    elif 131 <= blood_glucose_measurement <= 140:
        return 10
    elif 121 <= blood_glucose_measurement <= 130:
        return 9
    elif 111 <= blood_glucose_measurement <= 120:
        return 8
    elif 106 <= blood_glucose_measurement <= 110:
        return 7
    elif 101 <= blood_glucose_measurement <= 105:
        return 6
    elif 96 <= blood_glucose_measurement <= 100:
        return 5
    elif 90 <= blood_glucose_measurement <= 95:
        return 4
    elif 80 <= blood_glucose_measurement <= 89:
        return 3
    elif 70 <= blood_glucose_measurement <= 79:
        return 2
    elif 60 <= blood_glucose_measurement <= 69:
        return 1
    elif blood_glucose_measurement < 60:
        return 0



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
    """Retrieves the currrent patient data for a given nurse."""

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


@app.get("/get-all-patient-data/{nurse_id}")
async def get_all_patient_data(nurse_id: int = Path(...)):
    """Retrieves all patient data for a given nurse."""

    # Validate the nurse ID.
    if not isinstance(nurse_id, int):
        raise HTTPException(status_code=400, detail="Nurse ID must be an integer.")

    # Get the nurse document from the nurses collection.
    nurse = nurses_collection.find_one({"nurse_id": nurse_id})

    # If the nurse document does not exist, raise an exception.
    if nurse is None:
        raise HTTPException(status_code=404, detail="Nurse not found.")

    # Get the patient IDs from the nurse document.
    patient_ids = nurse["patient_ids"]

    # Get the patient data from the patients collection.
    patient_data = []
    for patient_id in patient_ids:
        patient_document = patients_collection.find_one({"patient_id": patient_id})

        # If the patient document does not exist, raise an exception.
        if patient_document is None:
            raise HTTPException(status_code=404, detail="Patient not found.")

        # Add the patient data to the list.
        patient_data.append({
            "patient_id": patient_id,
            "patient_name": patient_document["name"],
            "date_of_birth": patient_document["date_of_birth"],
            "room_no": patient_document["room_no"],
            "hours_since_last_meal": patient_document["hours_since_last_meal"]
        })

    # Return the patient data.
    return patient_data


def BG_to_D50W_dosage(blood_glucose_measurement):
    # input BG measurement, in order to get D50W sugar (ml)
    if 80 <= blood_glucose_measurement <= 89:
        return 0
    elif 70 <= blood_glucose_measurement <= 79:
        return 10
    elif 60 <= blood_glucose_measurement <= 69:
        return 15
    elif 50 <= blood_glucose_measurement <= 59:
        return 20
    elif 30 <= blood_glucose_measurement <= 49:
        return 25
    elif blood_glucose_measurement < 30:
        return 30

class TitrationRateInput(BaseModel):
    patient_id: int
    blood_glucose_measurement: int

@app.post("/titration-rate")
# patient_id, blood_glucose_measurement
async def calculate_titration_rate(body: TitrationRateInput = Body(...)):
    # Given BG measurement, return the titration rate (ml/hr)
    patient_id = body.patient_id
    blood_glucose_measurement = body.blood_glucose_measurement

    # Define constants for BG (blood glucose) ranges
    LOW_BG_THRESHOLD = 90
    HIGH_BG_THRESHOLD = 140
    
    patient = patients_collection.find_one({"$or": [{"patient_id": str(patient_id)}, {"patient_id": int(patient_id)}]})
    if not patient:
         return {"status_code": 404, "message": "Patient not found"}
    
    # return {list(patient.keys())[6]}
    # return {patient['titration_state']}
    #######return {patient['titration_state'] == None}
    # return {len(patient['titration_state']) == 0}
    # return {type(patient['titration_state'])}
    
    if patient['titration_state'] != None:
        titration_history = patient['titration_state']
        prev_BG_range, col = titration_history[-1]
        BG_range = BG_range_to_titration_matrix_row(blood_glucose_measurement)
        DW50_dosage = 0

        prev_col = col
        # Adjust the column based on BG range
        if blood_glucose_measurement < LOW_BG_THRESHOLD:
            if col >= 1:
                col -= 1
            DW50_dosage = BG_to_D50W_dosage(blood_glucose_measurement)
        elif blood_glucose_measurement > HIGH_BG_THRESHOLD and BG_range >= prev_BG_range:
            col += 1

        # patient['titration_state'] = TITRATION_MATRIX[BG_range][col]
        # updated_titration_history = patient['titration_state'].append((BG_range, col))
        titration_history.append((BG_range, col))
        patients_collection.update_one({"patient_id": int(patient_id)}, {"$set": {"titration_state": titration_history}})
        
        return {
            "titration_rate": TITRATION_MATRIX[BG_range][col],
            "prev_titration_rate": TITRATION_MATRIX[prev_BG_range][prev_col],
            "current_BG": blood_glucose_measurement,
            # "prev_BG": 
            "DW50_dosage": DW50_dosage
        }
    
    else:
        # New inpatient
        BG_range = BG_range_to_titration_matrix_row(blood_glucose_measurement)
        patient['titration_state'] = (BG_range, 1)
        patients_collection.update_one({"patient_id": int(patient_id)}, {"$set": {"titration_state": [(BG_range, 1)]}})

        # Always start in column 2
        return {
            "titration_rate": TITRATION_MATRIX[BG_range][1],
            "prev_titration_rate": None,
            "current_BG": blood_glucose_measurement,
            "prev_BG": None,
            "DW50_dosage": 0,
            "action": None
        }
    



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
