from booking.booking import Booking
from booking.constants import BASE_URL

with Booking() as inst:
    inst.land_first_page(url=BASE_URL)