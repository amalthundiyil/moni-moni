from turtle import title
import types
import typing
from selenium import webdriver
import os
from selenium.webdriver.common.by import By


class Booking(webdriver.Chrome):

    def __init__(self,driver_path = r";C:\Users\bhuva\Downloads\moni-moni\moni-moni\web scraping",teardown = False):
        self.driver_path = driver_path
        os.environ['PATH'] += self.driver_path
        super(Booking,self).__init__()
        self.teardown = teardown
        self.implicitly_wait(15)
        self.maximize_window()

    def land_first_page(self,url):
        self.get(url)

    def signup(self,firstName,lastName,email,password):
        element = self.find_element(by=By.CLASS_NAME,value='css-1vm6tb0')
        element.click()
        element = self.find_element(by=By.ID,value='firstName')
        element.send_keys(firstName)
        element = self.find_element(by=By.ID,value='lastName')
        element.send_keys(lastName)
        element = self.find_element(by=By.ID,value='email')
        element.send_keys(email)
        element = self.find_element(by=By.ID,value='password')
        element.send_keys(password)
        element = self.find_element(by=By.CLASS_NAME,value="css-nxzcop")
        element.click()

    def start_fundraiser(self,title,funding_req,desc,category):
        element = self.find_element(by=By.XPATH,value='/html/body/div[1]/header/div/div/div[2]/button[2]')
        element.click()
        element = self.find_element(by=By.XPATH,value='/html/body/div[1]/main/div/div[2]/div[1]/div/div/input')
        element.send_keys(title)
        element = self.find_element(by=By.XPATH,value='//*[@id="fund_total"]')
        element.send_keys(funding_req)
        element = self.find_element(by=By.XPATH,value='//*[@id="Description"]')
        element.send_keys(desc)
        element = self.find_element(by=By.XPATH,value='//*[@id="category"]')
        element.send_keys(category)
        element = self.find_element(by=By.CLASS_NAME,value='css-ym86of')
        element.click()

    def contribute_to_fundraiser(self,url,title):
        self.get(url+'discover')
        element = self.find_element(by=By.XPATH,value='//*[@id="root"]/div/div/div[1]/div/div/input')
        element.send_keys(title)
        element = self.find_element(by=By.XPATH,value='//*[@id="root"]/div/div/div[2]/a[1]')
        element.click()
        element= self.find_element(by=By.XPATH,value='//*[@id="root"]/div/main/div[1]/div/div/div[2]/div')
        element.click()
    
    def __exit__(self, exc_type: typing.Optional[typing.Type[BaseException]], exc: typing.Optional[BaseException], traceback: typing.Optional[types.TracebackType]):
        if(self.teardown):self.quit()
