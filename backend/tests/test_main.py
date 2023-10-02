from fastapi.testclient import TestClient
from main import app    # absolute import

client = TestClient(app)

def test_hello_world():
    response = client.get("/")
    assert response.status_code == 200
