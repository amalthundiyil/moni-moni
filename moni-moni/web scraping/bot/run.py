from booking.booking import Booking
from booking.constants import BASE_URL

with Booking() as inst:
    inst.land_first_page(url=BASE_URL)
    # inst.signup(firstName="Bhuvanesh",lastName="Trivedi",email="bhuvaneshtrivedi59@gmail.com",password="Bhuvanesh@06")
    inst.start_fundraiser(title="philantropy",funding_req=1000,desc="BHuvanesh care fund",category="mahila pidit sangh")
    # inst.contribute_to_fundraiser(url=BASE_URL,title="dog")