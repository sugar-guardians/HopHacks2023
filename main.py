import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Body, Path
from pydantic import BaseModel
from pymongo import MongoClient

# from bson import ObjectId
from fastapi import BackgroundTasks
from twilio.rest import Client as TwilioClient

from backend.titration import D50W_administration_ml, BG_range_to_titration_matrix_row, make_titration_matrix

load_dotenv()  # load environment variables from .env


def send_sms(phone_number):
    message = twilio_client.messages.create(
        from_="+18555142486",
        body="Reminder!!!\nTime to check BG and Titrate.",
        to=phone_number,
    )
    print(message.sid)
    # time.sleep(12)  # Wait for 12 seconds before sending the next SMS


def nurse_to_json(nurse):
    nurse["id"] = str(nurse["_id"])
    del nurse["_id"]
    return nurse


app = FastAPI()

client = MongoClient(os.getenv("MONGODB_URI"), tlsAllowInvalidCertificates=True)
db = client["hospital"]
db1 = client.nurse_db
patients_collection = db["patients"]
nurses_collection = db["nurses"]
twilio_client = TwilioClient(os.getenv("account_sid"), os.getenv("auth_token"))


class NurseBase(BaseModel):
    nurse_name: str
    nurseID: str
    email: str
    password: str
    phone: int


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


TITRATION_MATRIX = make_titration_matrix()


class NurseDataSchema(BaseModel):
    nurse_id: int
    nurse_name: str
    patient_id: int
    drip_started: bool


@app.get("/")
async def hello_world():
    return {"message": "Hello, world!"}



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

    patient = patients_collection.find_one(
        {"$or": [{"patient_id": str(patient_id)}, {"patient_id": int(patient_id)}]}
    )
    if not patient:
        return {"status_code": 404, "message": "Patient not found"}

    # return {list(patient.keys())[6]}
    # return {patient['titration_state']}
    #######return {patient['titration_state'] == None}
    # return {len(patient['titration_state']) == 0}
    # return {type(patient['titration_state'])}

    if patient["titration_state"] != None:
        titration_history = patient["titration_state"]
        prev_BG_range, col = titration_history[-1]
        BG_range = BG_range_to_titration_matrix_row(blood_glucose_measurement)
        DW50_dosage = 0

        prev_col = col
        # Adjust the column based on BG range
        if blood_glucose_measurement < LOW_BG_THRESHOLD:
            if col >= 1:
                col -= 1
            DW50_dosage = D50W_administration_ml(blood_glucose_measurement)
        elif (
            blood_glucose_measurement > HIGH_BG_THRESHOLD and BG_range >= prev_BG_range
        ):
            col += 1

        # patient['titration_state'] = TITRATION_MATRIX[BG_range][col]
        # updated_titration_history = patient['titration_state'].append((BG_range, col))
        titration_history.append((BG_range, col))
        patients_collection.update_one(
            {"patient_id": int(patient_id)},
            {"$set": {"titration_state": titration_history}},
        )

        return {
            "titration_rate": TITRATION_MATRIX[BG_range][col],
            "prev_titration_rate": TITRATION_MATRIX[prev_BG_range][prev_col],
            "current_BG": blood_glucose_measurement,
            # "prev_BG":
            "DW50_dosage": DW50_dosage,
        }

    else:
        # New inpatient
        BG_range = BG_range_to_titration_matrix_row(blood_glucose_measurement)
        patient["titration_state"] = (BG_range, 1)
        patients_collection.update_one(
            {"patient_id": int(patient_id)},
            {"$set": {"titration_state": [(BG_range, 1)]}},
        )

        # Always start in column 2
        return {
            "titration_rate": TITRATION_MATRIX[BG_range][1],
            "prev_titration_rate": None,
            "current_BG": blood_glucose_measurement,
            "prev_BG": None,
            "DW50_dosage": 0,
            "action": None,
        }


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
        return {
            "message",
            "No patient with active drip, click the button to start a drip.\n",
        }

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
        patient = patients_collection.find_one({"patient_id": patient_id})

        # If the patient document does not exist, raise an exception.
        if patient is None:
            raise HTTPException(status_code=404, detail="Patient not found.")

        # Add the patient data to the list.
        patient_data.append(
            {
                "patient_id": patient_id,
                "first_name": patient["first_name"],
                "last_name": patient["last_name"],
                "date_of_birth": patient["date_of_birth"],
                "room_no": patient["room_no"],
                "hours_since_last_meal": patient["hours_since_last_meal"],
            }
        )

    # Return the patient data.
    return patient_data


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
        return {
            "message",
            "No patient with active drip, click the button to start a drip.\n",
        }

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
        patient = patients_collection.find_one({"patient_id": patient_id})

        # If the patient document does not exist, raise an exception.
        if patient is None:
            raise HTTPException(status_code=404, detail="Patient not found.")

        # Add the patient data to the list.
        patient_data.append(
            {
                "patient_id": patient_id,
                "first_name": patient["first_name"],
                "last_name": patient["last_name"],
                "date_of_birth": patient["date_of_birth"],
                "room_no": patient["room_no"],
                "hours_since_last_meal": patient["hours_since_last_meal"],
            }
        )

    # Return the patient data.
    return patient_data


@app.post("/signup")
async def create_nurse(background_tasks: BackgroundTasks, nurse: NurseBase):
    if db1.nurses.find_one({"nurseID": nurse.nurseID}):
        raise HTTPException(status_code=400, detail="NurseID already registered")

    db1.nurses.insert_one(nurse.dict())
    nurse_data1 = db1.nurses.find_one({"nurseID": nurse.nurseID})
    background_tasks.add_task(send_sms, nurse.phone)
    return {"message": "Nurse created successfully"}


@app.post("/login")
async def login_nurse(background_tasks: BackgroundTasks, nurse: NurseLogin):
    nurse_data = db1.nurses.find_one(
        {"nurseID": nurse.nurseID, "password": nurse.password}
    )
    if nurse_data:
        # nurse_data1 = db1.nurses.find_one("phone")
        # print(nurse_data1);
        # background_tasks.add_task(send_sms, nurse.phone)
        return {"message": "Login successful"}

    raise HTTPException(status_code=400, detail="Invalid credentials")



if __name__ == "__main__":
    import uvicorn

    # Replace "app" with the name of your FastAPI instance if it's different.
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)