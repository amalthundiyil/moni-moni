import json


def test_get_address(base_url, auth_headers, auth_request):
    url = base_url + "api/v1/users/address/"
    payload = {}
    response = auth_request.get(url, headers=auth_headers, data=payload)
    assert response.ok


def test_get_user(base_url, auth_headers, auth_request):
    url = base_url + "api/v1/users/user/"
    payload = {}
    response = auth_request.get(url, headers=auth_headers, data=payload)
    assert response.ok


def test_address(base_url, auth_headers, auth_request):
    url = base_url + "api/v1/users/address/"
    payload = json.dumps(
        {
            "full_name": "test",
            "country": "IN",
            "postcode": "400000",
            "address_line_1": "test",
            "address_line_2": "test",
            "town_city": "India",
        }
    )
    response = auth_request.post(url, headers=auth_headers, data=payload)
    assert response.ok

    url = base_url + "api/v1/users/address/"
    payload = {}
    response = auth_request.get(url, headers=auth_headers, data=payload)
    assert response.ok

    address_id = response.json()[0]["id"]
    url = base_url + f"api/v1/users/address/{address_id}/"
    payload = {}
    response = auth_request.delete(url, headers=auth_headers, data=payload)
    assert response.ok
