from pymongo import MongoClient

client = MongoClient('mongodb+srv://tirthofficials:xK0W7XtI7JLWfhJz@cluster0.dvejt5r.mongodb.net/?retryWrites=true&w=majority', tlsAllowInvalidCertificates=True)
database = client["hospital"]
nurses_collection = database["nurses"]

sample_nurses = [
    {"nurse_id": 1, "first_name": "Binh", "last_name": "Nguyen", "email": "bnguyen@gmail.com", "password": "hophacks", "patient_ids": []},
]

# Function to add a nurse to the database
def add_nurse(nurse_data):
    nurses_collection.insert_one(nurse_data)

for nurse in sample_nurses:
    add_nurse(nurse)

# Close the MongoDB connection
client.close()