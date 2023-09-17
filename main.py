from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from bson import ObjectId
from fastapi import BackgroundTasks
from twilio.rest import Client

account_sid = 'AC6380f4e379a140460b4b532bfa68ed94'
auth_token = 'ecb058ec180dd0e1eb54a56ccf9fcab6'
client = Client(account_sid, auth_token)
def send_sms(phone_number):
    for i in range(5):
        message = client.messages.create(
          from_='+18555142486',
          body='Reminder!!!\nTime to check BG and Titrate.',
          to=phone_number
        )
        print(message.sid)
        # time.sleep(12)  # Wait for 12 seconds before sending the next SMS

def nurse_to_json(nurse):
    nurse['id'] = str(nurse['_id'])
    del nurse['_id']
    return nurse

load_dotenv()
app = FastAPI()

client = MongoClient(os.getenv("MONGODB_URI"), tlsAllowInvalidCertificates=True)


db = client.nurse_db
class InsulinChart(BaseModel):
    bg_level: str
    columns: list[float]


class NurseBase(BaseModel):
    nurse_name: str
    nurseID: str
    email: str
    password: str

class NurseLogin(BaseModel):
    nurseID: str
    password: str

@app.post("/signup/")
async def create_nurse(background_tasks: BackgroundTasks, nurse: NurseBase):
    if db.nurses.find_one({"nurseID": nurse.nurseID}):
        raise HTTPException(status_code=400, detail="NurseID already registered")
    db.nurses.insert_one(nurse.dict())
    nurse_data1 = db.nurses.find_one({"nurseID": nurse.nurseID})
    background_tasks.add_task(send_sms, nurse.phone)
    return {"message": "Nurse created successfully"}


@app.post("/login/")
async def login_nurse(background_tasks: BackgroundTasks, nurse: NurseLogin):
    nurse_data = db.nurses.find_one({"nurseID": nurse.nurseID, "password": nurse.password})
    if nurse_data:
        background_tasks.add_task(send_sms, nurse.phone)
        return {"message": "Login successful"}

    raise HTTPException(status_code=400, detail="Invalid credentials")
