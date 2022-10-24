from booking.booking import Booking
from booking.constants import BASE_URL,ADDRESS_DETAILS,PAYMENT_DETAILS

with Booking() as inst:
    inst.land_first_page(url=BASE_URL)
    # inst.signup(details = ADDRESS_DETAILS)
    # inst.start_fundraiser(title="philantropy",funding_req=1000,desc="BHuvanesh care fund",category="mahila pidit sangh")
    inst.signin(email="bhuvaneshtrivedi59@gmail.com",password='Bhuvanesh@06')
    inst.contribute_to_fundraiser(url=BASE_URL,title="dog",choice_of_funding=2)
    inst.enter_details(address=ADDRESS_DETAILS,payment = PAYMENT_DETAILS)
