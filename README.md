<p align='center'>
<img width="50%" src='./docs/images/logo.png'>
</p>

<h1>
<p align='center'>
Moni Moni - Crowdfunding Platform
</p>
</h1>

<p align='center'>
<img src="https://github.com/amal-thundiyil/monimoni/actions/workflows/actions.yml/badge.svg">
<a href="https://github.com/amal-thundiyil/monimoni/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg">
<a href="https://github.com/amal-thundiyil/monimoni/pulls"><img src="https://img.shields.io/badge/PR-Welcome-brightgreen.svg"></a>
<a href="https://github.com/amal-thundiyil/monimoni/issues"><img src="https://img.shields.io/github/issues/amal-thundiyil/monimoni"></a>
<img src="https://visitor-badge.laobi.icu/badge?page_id=amal-thundiyil.monimoni">

</p>
<!-- 
<h3>
<p align='center'>
🚧 Moni Moni is live <a href="https://moni2.herokuapp.com/">here</a> 🚧
</p>
</h3> -->

## 📌 Introduction

Moni Moni is fundamentally a crowdfunded small-scale loaning service. Users can post their loan requests along with the interest they can payback and the reason they want money for, other users can view the request and decide whether they want to invest in the person depending upon the interest rate and the reason for request.

## 👨‍💻️ Technology Stack

- [React.js](https://github.com/facebook/react)
- [Material UI](https://github.com/mui/material-ui)
- [Django](https://github.com/django/django)
- [Amazon Web Services (AWS)](https://github.com/aws)

## 🎓 Description

### Features

- A beautiful space to tell your story
- Highlight your donors, either by name or anonymously
- Clearly detail fees
- Super fast and responsive design
- Handles payments via [PayPal](https://paypal.com/)
- Easy social sharing
- Open source, so adapt it to your needs

### Background

In February 2017, a family member approached me to talk fundraising. They had established a college fund for a very special family, and wanted a way to accept donations from others.

Platforms like [Kickstarter](https://www.kickstarter.com/), [Indiegogo](https://www.indiegogo.com/), and [everydayhero](https://www.everydayhero.com/) are great for attracting attention to important campaigns, but they charge high fees. Including credit processing fees, they both charge around 8%. That money goes toward supporting the platform, and not the cause. And that's fine if raising funds for a for-profit venture, but my mission is non-profit.

Then come the do-it-yourself options. There are many HTML templates out there, some free and others not. However, they lack any behind-the-scenes logic to actually handle donations. Adding a PayPal button is easy, but that doesn't allow donors to track campaign progress.

It is for all of these reasons I created Moni Moni. It's entirely open source and yours to use as you wish. I think it's also an example of how easy it can be to develop cool, interactive stuff in React. I hope you find it useful, and I hope you will consider [contributing](#CONTRIBUTING) to the project as well.

### Technical Overview

This is the overview of the architecture of the web application:

<p align="center">
    <img src="./docs/images/Arch.png" width="70%">
</p>

### Screenshots

#### Signup Page

<p align="center">
    <img src="./docs/images/signup.png" width="70%">
</p>

#### Login Page

<p align="center">
    <img src="./docs/images/login.png" width="70%">
</p>

## 🙏 Contributing

Please read the [contributing guidlines](CONTRIBUTING.md). To setup this project locally:

### 🐳 Using Docker

With Docker and docker-compose installed, run docker-compose up --build

```sh
docker-compose up --build
```

Open the browser at http://localhost:3000/. 👨‍🏭️

### 🛠️ Other alternative

Change the directory to the `monimoni/client/` folder and run:

```
npm start
```

Change the directory to the `monimoni/server/` folder and run:

```sh
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

Open the browser at http://localhost:3000/. 👨‍🏭️

## 📝 Further Changes to be Done

- [ ] Add options to accept funding made with NFTs and digital currency.
