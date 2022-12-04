def test_get_categories(base_url, auth_headers, auth_request):
    url = base_url + "api/v1/catalogue/category/"
    payload = {}
    response = auth_request.get(url, headers=auth_headers, data=payload)
    assert response.ok


def test_get_fundraisers(base_url, auth_headers, auth_request):
    url = base_url + "api/v1/catalogue/fundraisers/all/"
    payload = {}
    response = auth_request.get(url, headers=auth_headers, data=payload)
    assert response.ok


# def test_fundraiser(base_url, auth_headers, auth_request):
#     url = base_url + "api/v1/catalogue/fundraisers/"
#     form_headers = auth_headers
#     form_headers[
#         "Content-Type"
#     ] = "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
#     payload = {
#         "title": "April's Light The Night Fundraiser",
#         "description": "The next generation of home energy storage is here. SuperBase V is the first and only home energy storage system with semi-solid state batteries for greater storage capacity and superior safety. With dual 120V/240V output, dual input up to 6,600W, the industry's fastest solar charging performance, seamless UPS feature, and customizable systems with up to 64kWh of storage capacity, SuperBase V ensures you are supercharged anytime, anywhere.",
#         "total_amount": "10000000.00",
#         "category": "others",
#     }
#     response = auth_request.post(url, headers=form_headers, data=payload, files=[])
#     assert response.ok

#     slug = response.json()["slug"]
#     url = base_url + f"api/v1/catalogue/fundraisers/{slug}/"
#     response = auth_request.delete(url, headers=auth_headers, data=payload)
#     import pdb; pdb.set_trace()
#     assert response.ok
