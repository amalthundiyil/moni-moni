import json
import os

import pytest
import requests


@pytest.fixture(scope="module")
def base_url():
    url = os.getenv("REACT_APP_BACKEND_URL")
    print(url)
    return url


@pytest.fixture(scope="module")
def base_headers():
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    return headers


@pytest.fixture()
def auth_token(base_url, base_headers):
    url = base_url + "api/v1/auth/login/"
    payload = json.dumps({"email": "test@test.com", "password": "test"})
    response = requests.request("POST", url, headers=base_headers, data=payload)
    assert response.ok
    return response.json()["token"]


@pytest.fixture()
def auth_headers(base_headers, auth_token):
    headers = base_headers
    headers["Authorization"] = f"Bearer {auth_token}"
    return headers


@pytest.fixture(scope="module")
def auth_request(base_url, base_headers):
    r = requests.Session()
    url = base_url + "api/v1/auth/login/"
    payload = json.dumps({"email": "test@test.com", "password": "test"})
    response = r.post(url, headers=base_headers, data=payload)
    assert response.ok
    return r
