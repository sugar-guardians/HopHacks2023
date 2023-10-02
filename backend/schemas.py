from pydantic import BaseModel


class PatientDataSchema(BaseModel):
    patient_name: str
    patient_id: int
    room_number: int
    date_of_birth: str


class NurseDataSchema(BaseModel):
    nurse_id: int
    nurse_name: str
    patient_id: int
    drip_started: bool
