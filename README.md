# SugarGuardians @ HopHacks 2023

> Award-winning project, top 10 hack and Best Use of Google Cloud.

A mobile app that simplifies the in-patient insulin titration process for patients with high blood sugar. Simplifying, minimizing mistakes, saving people's lives.

[![Devpost](./docs/images/devpost-logo.svg)](https://devpost.com/software/569099)  
[![Youtube](./docs/images/icons8-youtube.svg)](https://youtu.be/-ziZ5leNQZ4)

## Tech Stack
React Native, FastAPI/Python, GCP Cloud Run/Cloud Build, MongoDB, Docker

## Environment Setup
1. Clone the repo: `git clone https://github.com/sugar-guardians/HopHacks2023.git`

2. For backend, install the Python dependencies: `pip install -r requirements.txt`

To run: `uvicorn main:app --reload` or `python main.py`

4. For fronend, navigate to the `nurse_app` directory and run `npm install`

5. For database, we are using MongoDB Atlas, MongoDB's managed database service. No local installation necessary.



## Testing

`pytest --cov=main .` for % lines covered  
`pytest --cov=main --cov-report=html` to generate code coverage report
