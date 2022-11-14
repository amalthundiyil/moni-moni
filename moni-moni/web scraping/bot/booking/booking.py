import types
import typing
import requests
from selenium import webdriver
import os
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import pyperclip as pc
import subprocess


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

    def signin(self,email,password):
        # element = self.find_element(by=By.CLASS_NAME,value='css-1vm6tb0')
        # element.click()
        element = self.find_element(by=By.CSS_SELECTOR,value='a[href="/login"]')
        element.click()
        element = self.find_element(by=By.ID,value='email')
        element.send_keys(email)
        element = self.find_element(by=By.ID,value='password')
        element.send_keys(password)
        element.send_keys(Keys.ENTER)
    
    def enter_details(self,address,payment):
        for i in address:
            element = self.find_element(by=By.ID,value=i)
            element.send_keys(address[i])
        element = self.find_element(by=By.XPATH,value='//*[@id="root"]/main/div/div[3]/button')
        element.click()
        for i in payment:
            element = self.find_element(by=By.ID,value=i)
            element.send_keys(payment[i])
        element = self.find_element(by=By.XPATH,value='//*[@id="root"]/main/div/div[4]/button[2]')
        element.click() 


    def checkLinks(self):
        element = self.find_element(by=By.CSS_SELECTOR,value='input[type = "text"]')
        element.send_keys(' ')
        links = self.find_elements(by=By.CSS_SELECTOR,value='a[href *="/fundraisers"]')
        start = time.time()
        for i in links:
            r = requests.head(i.get_attribute('href'))
            if r.status_code == 400:
                print("Bad link ",i.get_attribute('href'))
            else :print("Working link ",i.get_attribute('href'))
        print(time.time()-start)
        
    def crawlData(self,url):
        elements = []
        self.get(url)
        element = self.find_elements(by=By.CLASS_NAME,value='CommunityFundraiserCard_community-campaign__CZjmd')
        length = len(element)
        print(length)
        for i in range(1,length+1):
            ans = {}
            image = self.find_element(by=By.XPATH,value=f'//*[@id="main"]/section[6]/div[1]/ul/li[{i}]/a/div[1]')
            image = image.get_attribute('style')
            image = image.split('"')
            print(image[1]) 
            subprocess.run(["powershell",f'curl {image[1]} -o {i}.jpeg'],shell=True)           
            title = self.find_element(by=By.XPATH,value=f'//*[@id="main"]/section[6]/div[1]/ul/li[{i}]/a/div[2]/h3')
            desc = self.find_element(by=By.XPATH,value=f'//*[@id="main"]/section[6]/div[1]/ul/li[{i}]/a/div[2]/p')
            fundingRaised = ''.join(filter(lambda i:i.isdigit(), self.find_element(by=By.XPATH,value=f'//*[@id="main"]/section[6]/div[1]/ul/li[{i}]/a/div[2]/div/span[1]').get_attribute('innerHTML')))
            ans["title"] = title.get_attribute('innerHTML')
            ans["desc"] = desc.get_attribute('innerHTML')
            ans["fundraised"] = fundingRaised
            elements.append(ans)
        return elements

    def signup(self,details):
        # element = self.find_element(by=By.CLASS_NAME,value='css-w31vqt')
        element = self.find_element(by=By.XPATH,value='//*[@id="root"]/div/div[1]/header/div/div/div[3]/a')
        element.click()
        element = self.find_element(by=By.CSS_SELECTOR,value='a[href*="/signup"]')
        element.click()
        for i in details:
            element = self.find_element(by=By.ID,value=i)
            element.send_keys(details[i])
        element = self.find_element(by=By.CLASS_NAME,value="css-nxzcop")
        element.click()

    def start_fundraiser(self,url,title,funding_req,desc,j):
        self.get(url+'start-fundraiser')
        fundraiserOption = self.find_element(by=By.XPATH,value='//*[@id="root"]/div/div[2]/div/div/div/nav/div[4]/div[2]/span')
        fundraiserOption.click()
        plusButton = self.find_element(by=By.CSS_SELECTOR,value='path[d = "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"]')
        plusButton.click()
        titleOpt = self.find_element(by=By.ID,value='title')
        titleOpt.send_keys(title)
        totalAmt = self.find_element(by=By.ID,value='totalAmount')
        totalAmt.send_keys(funding_req)
        pc.copy(desc)
        description = self.find_element(by=By.ID,value='description')
        description.send_keys(Keys.CONTROL,'v')
        image = self.find_element(by=By.CSS_SELECTOR,value='input[type="file"]')
        image.send_keys(rf'C:\JS prac\moni-moni\moni-moni\web scraping\bot\{j}.jpeg')
        element = self.find_element(by=By.XPATH,value='/html/body/div[4]/div[3]/div/div[6]/div/button')
        element.click()
        time.sleep(15)

    def contribute_to_fundraiser(self,url,title,choice_of_funding):
        self.get(url+'discover')
        element = self.find_element(by=By.CSS_SELECTOR,value='input[placeholder="Search by fundraiser title"]')
        element.send_keys(title)
        element = self.find_element(by=By.XPATH,value='//*[@id="root"]/div/div[2]/div/div/div[2]/a')
        element.click()
        element= self.find_element(by=By.XPATH,value='//*[@id="root"]/div/div[2]/div/main/div[1]/div/div[2]/div/div[2]/div/a')
        element.click()
        element = self.find_element(by=By.XPATH,value=f'//*[@id="root"]/div/div[2]/main[2]/div/div[{choice_of_funding}]/div/div[3]/button')
        element.click()
 
    def __exit__(self, exc_type: typing.Optional[typing.Type[BaseException]], exc: typing.Optional[BaseException], traceback: typing.Optional[types.TracebackType]):
        if(self.teardown):self.quit()

    def get_fundraisers(self):
        element = self.find_element(by=By.XPATH,value='//*[@id="root"]/div/main/div[3]/div/div[1]').find_elements(by=By.CLASS_NAME,value='css-t1nuxs')
        print(len(element))
        for i in element:
            print(i.get_attribute('innerHTML'))
