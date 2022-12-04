import json
import os

import pytest
import requests


@pytest.fixture
def base_url():
    url = os.getenv("REACT_APP_BACKEND_URL")
    print(url)
    return url


@pytest.fixture
def base_headers():
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    return headers


@pytest.fixture
def auth_token(base_url, base_headers):
    url = base_url + "api/v1/auth/login/"
    payload = json.dumps({"email": "test@test.com", "password": "test"})
    response = requests.request("POST", url, headers=base_headers, data=payload)
    assert response.ok
