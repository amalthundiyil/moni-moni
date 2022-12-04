import json

import requests


def test_login(base_url, base_headers):
    url = base_url + "api/v1/auth/login/"
    payload = json.dumps({"email": "test@test.com", "password": "test"})
    response = requests.request("POST", url, headers=base_headers, data=payload)
    assert response.ok


def test_token(base_url, auth_headers, auth_request):
    url = base_url + "api/v1/auth/token/refresh/"
    payload = {}
    response = auth_request.post(url, headers=auth_headers, data=payload)
    assert response.ok


def test_logout(base_url, auth_headers, auth_request):
    url = base_url + "api/v1/auth/logout/"
    payload = {}
    response = auth_request.post(url, headers=auth_headers, data=payload)
    assert response.ok


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
