import time
from booking.booking import Booking
from booking.constants import BASE_URL,ADDRESS_DETAILS,PAYMENT_DETAILS

with Booking() as inst:
    inst.land_first_page(url=BASE_URL+'discover')
    inst.checkLinks()
    data = inst.crawlData(url='https://www.gofundme.com/')
    inst.land_first_page(url=BASE_URL)
    inst.signin(email="bhuvaneshtrivedi59@gmail.com",password='Bhuvanesh@06')
    time.sleep(10)
    count = 1
    for i in data:
        inst.start_fundraiser(url=BASE_URL,title=i["title"],funding_req=i["fundraised"],desc=i["desc"],i = count)
        count = count+1
    # inst.contribute_to_fundraiser(url=BASE_URL,title="hussain",choice_of_funding=2)
    # time.sleep(10)
    # time.sleep(30)
    # inst.signup(details = ADDRESS_DETAILS)
    # inst.enter_details(address=ADDRESS_DETAILS,payment = PAYMENT_DETAILS)
    # inst.get_fundraisers()
