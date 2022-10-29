<p align='center'>
<img width="50%" src='./docs/images/logo.png'>
</p>

<h1>
<p align='center'>
Moni Moni - Crowdfunding Platform
</p>
</h1>

<p align='center'>
<img src="https://github.com/amal-thundiyil/moni-moni/actions/workflows/actions.yml/badge.svg">
<a href="https://github.com/amal-thundiyil/moni-moni/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg">
<img src="https://visitor-badge.laobi.icu/badge?page_id=amal-thundiyil.moni-moni">

## 📌 Introduction

A full-stack crowd-funding platform for social, charity, personal and creative causes. Users can post their loan/donation requests along with the interest or other rewards they can offer and the story backing the fundraiser. Backers can view the request and decide whether they want to pledge or invest depending upon the rewards and the story. It is meant to be as simple as possible to facilitate the unempowered population of our world.

## 🤖 Usage

With Docker and docker-compose installed:

```sh
docker-compose up --build
```

Otherwise, you can also use the [Makefile](Makefile):

```sh
python3.8 -m venv venv
source venv/bin/activate
make install-dev
make frontend-start
make backend-start
```

## 🎓 Description

### ️Technology Stack

- [React.js](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux)
- [Django](https://github.com/django/django)
- [PostgreSQL](https://www.postgresql.org/)

### ️Diagrams




### Product Functionality

#### Users and Characteristics
The system consists of two types of main users i.e Donors and fundraiser creators. Other users include the spectators. The system is also designed to be user-friendly. It uses a Graphical
User Interface (GUI). Types of users:

- Donors: These are the users who are responsible for adding funds to the fundraiser. They can choose to validate the reasons of the fundraiser creator and then choose to add funds.
- Fundraiser Creator: The fundraiser creator is responsible for creating the fundraiser and outlining the details required for a meaningful fundraiser.
- Spectators: These are the people who can choose to contribute to any fundraiser they come across.

#### Design and Implementation Constraints
- Verification of fundraisers: The software doesn’t provide any ability for the fundraiser to be payment to be verified. There might even be fundraisers which were not expired by the user or fake users creating multiple fundraisers with the same account. There security risks are not mitigated in this platform. User discretion is advised.
- Tracking of fundraisers: The software doesn’t provide any ability for the fundraiser to be payment to be tracked. The crowdfunding platform is merely a platform to connect the fundraiser creator to the potential donors/contributors.
- Legally compliant payment system: To make the payment legally compliant, no real payments are executed. All payments will be made using a dummy account.


## 📝 Further Changes to be Done

- [ ] Add credit score to every individual or business using Machine Learning.
- [ ] Add options to accept funding made with NFTs and digital currency.
