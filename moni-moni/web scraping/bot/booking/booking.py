from asyncio import constants
import types
import typing
from selenium import webdriver
import os


class Booking(webdriver.Chrome):

    def __init__(self,driver_path = r";C:\Users\bhuva\Downloads\moni-moni\moni-moni\web scraping",teardown = False):
        self.driver_path = driver_path
        os.environ['PATH'] += self.driver_path
        super(Booking,self).__init__()
        self.teardown = teardown
        self.maximize_window()

    def land_first_page(self,url):
        self.get(url)
    
    def __exit__(self, exc_type: typing.Optional[typing.Type[BaseException]], exc: typing.Optional[BaseException], traceback: typing.Optional[types.TracebackType]):
        if(self.teardown):self.quit()
