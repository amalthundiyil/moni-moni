import json

import requests


# def test_register(base_url, base_headers):
#     url = base_url + "api/v1/auth/register/"
#     payload = json.dumps(
#         {
#             "user_name": "test",
#             "email": "test@test.com",
#             "password": "test",
#         }
#     )
#     response = requests.request("POST", url, headers=base_headers, data=payload)
#     assert response.ok


def test_login(base_url, base_headers):
    url = base_url + "api/v1/auth/login/"
    payload = json.dumps({"email": "test@test.com", "password": "test"})
    response = requests.request("POST", url, headers=base_headers, data=payload)
    assert response.ok


def test_token(base_url, base_headers):
    r = requests.Session()
    url = base_url + "api/v1/auth/login/"
    payload = json.dumps({"email": "test@test.com", "password": "test"})
    response = r.post(url, headers=base_headers, data=payload)
    assert response.ok

    url = base_url + "api/v1/auth/token/refresh/"
    payload = {}
    headers = base_headers
    headers["Authorization"] = f'Basic {response.json()["token"]}'
    response = r.post(url, headers=headers, data=payload)
    assert response.ok
