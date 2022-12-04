import json


def test_checkout(base_url, auth_headers, auth_request):
    url = base_url + "api/v1/checkout/payments/"
    payload = json.dumps(
        {
            "id": "0000000000000",
            "status": "COMPLETED",
            "payer_email": "test@test.com",
            "payee_email": "test@test.com",
            "payer_id": "0000000000000",
            "payee_id": "0000000000000",
            "currency_code": "USD",
            "value": "10000.00",
            "fundraiser": "aa778069-2804-46fd-bf4b-0fa69b130ff1",
            "fundraiser_title": "test",
        }
    )
    response = auth_request.post(url, headers=auth_headers, data=payload)
    assert response.ok

    url = base_url + "api/v1/checkout/payments/0000000000000/"
    response = auth_request.delete(url, headers=auth_headers, data=payload)
    assert response.ok
