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
<a href="https://github.com/amal-thundiyil/moni-moni/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" > </a>
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

### Implementation

**1) Home Page:** The home page is the page that is opened when the user
first opens the website.

<img src="./docs/images/image5.png"
 style="width:5.76772in;height:2.76389in" />

 <img src="./docs/images/image13.png" style="width:5.76772in;height:2.75in" />

**3) Discover Fundraiser:** This page allows users to search the
fundraisers that are active on our website.

<img src="./docs/images/image7.png"
 style="width:5.76772in;height:2.56944in" />

**4) Fundraiser Dashboard:** This page contains all the information of
the opened fundraiser and how much funds till date are raised through
our website and the target money to be raised.

<img src="./docs/images/image16.png"
 style="width:5.76772in;height:2.93056in" />

**5) Log in/Sign Up page:** These pages are used for logging in the
user. Besides the traditional method of logging in. Once the user is
registered the user will be sent an email to verify the account.

<img src="./docs/images/image17.png"
 style="width:5.76772in;height:2.91667in" />

<img src="./docs/images/image6.png"
 style="width:5.76772in;height:2.29167in" />

**6) Payment page:** This page is only visible to verified users,
through this page users can donate to a fundraiser using one of the
payment methods available.

1.  Choose the funding options

<img src="./docs/images/image14.png" style="width:5.76772in;height:2.625in" />

2.  Fill up the address details

<img src="./docs/images/image18.png"
 style="width:5.76772in;height:2.93056in" />

3.  Choose the payment method.

<img src="./docs/images/image9.png"
 style="width:5.76772in;height:2.91667in" />

4.  Login to your paypal account

<img src="./docs/images/image2.png"
 style="width:5.76772in;height:2.91667in" />

5.  Verify the amount and click on pay now

<img src="./docs/images/image15.png"
 style="width:5.76772in;height:2.91667in" />

6.  Payment Successful

<img src="./docs/images/image3.png"
 style="width:5.76772in;height:2.91667in" />

**7) User Profile:** From this page, the user can edit his/her
information address and fundraisers.

<img src="./docs/images/image11.png"
 style="width:5.76772in;height:2.90278in" />

<img src="./docs/images/image8.png"
 style="width:5.76772in;height:2.93056in" />

**8) Add Address information:** Through this page, users can edit or
add address information.

<img src="./docs/images/image4.png"
 style="width:5.76772in;height:2.91667in" />

<img src="./docs/images/image1.png"
 style="width:5.76772in;height:2.91667in" />

**9) Dashboard:** This page contains information about all the credits
and debits of the user. This page also contains a graph of
transactions the user has received and the last 10 recent deposits by
the user.

<img src="./docs/images/image10.png"
 style="width:5.76772in;height:2.93056in" />

### ⏳️ Background

In India people are turning to private moneylenders as banks are turning them away. People fear an increase in farmer suicides as more and more farmers approach moneylenders in desperation. The credit policy reform has just remained on paper ([source](https://indianexpress.com/article/india/as-lending-by-rural-banks-dips-farmers-turn-to-moneylenders-in-maharashtra-5091469/)).

A significant portion of debt from non-institutional sources is used for other household expenditure. The data indicates that better-off households have greater access to formal-sector credit and use it for more income-generating purposes. The top 10 per cent rural households in terms of asset ownership spend almost two-thirds of their institutional debt and 40 per cent of non-institutional debt on farm/non-farm business, whereas the bottom 10 per cent spend half of their total debt on household expenditure.

Access to institutional credit is largely determined by the ability of households to furnish assets as collateral.The report shows that the top 10 per cent of asset-owning households have borrowed 80 per cent of their total debt from institutional sources, whereas those in the bottom 50 per cent borrowed around 53 per cent of total debt from non-institutional sources. Moreover, the Debt-Asset Ratio (DAR) of the bottom 10 per cent asset-owning households in rural India is 39, much higher than the DAR of 2.6 estimated for the top 10 per cent households. This, coupled with higher borrowing from non-institutional sources, acts as a debt trap for households with fewer assets. The low asset ownership of marginalised social groups curtails their access to institutional credit.

Bankers and private financial institutions erroneously believe that a poor person takes a microcredit loan because she cannot save. In reality, if you go to any remote area in India and ask any woman how much she has saved in the post office, you will find huge numbers. They are able to save because of village postal agents who collect their savings from their doorstep. Greater accessibility has major benefits for not only the customer but also the supplier ([source](https://indianexpress.com/article/opinion/columns/financial-inclusion-rural-economy-nano-enterprises-7506874/)).

### 🤷 Why Moni Moni?

Now you may ask why Moni Moni and not the other big crowdfunding platforms.

Platforms like [Kickstarter](https://www.kickstarter.com/), [Indiegogo](https://www.indiegogo.com/), and [everydayhero](https://www.everydayhero.com/) are great for attracting attention to important campaigns, but they charge high fees. Including credit processing fees, they both charge around 8%. That money goes toward supporting the platform, and not the cause. And that's fine if raising funds for a for-profit venture, but my mission is non-profit.

It is for all of these reasons I created Moni Moni. It's entirely open source and yours to use as you wish. I think it's also an example of how easy it can be to develop cool, interactive stuff in React and Django. I hope you find it useful, and I hope you will consider [contributing](#CONTRIBUTING) to the project as well.

### Users and Characteristics

The system consists of two types of main users i.e Donors and fundraiser creators. Other users include the spectators. The system is also designed to be user-friendly. It uses a Graphical
User Interface (GUI). Types of users:

- Donors: These are the users who are responsible for adding funds to the fundraiser. They can choose to validate the reasons of the fundraiser creator and then choose to add funds.
- Fundraiser Creator: The fundraiser creator is responsible for creating the fundraiser and outlining the details required for a meaningful fundraiser.
- Spectators: These are the people who can choose to contribute to any fundraiser they come across.

### Design and Implementation Constraints

- Verification of fundraisers: The software doesn’t provide any ability for the fundraiser to be payment to be verified. There might even be fundraisers which were not expired by the user or fake users creating multiple fundraisers with the same account. There security risks are not mitigated in this platform. User discretion is advised.
- Tracking of fundraisers: The software doesn’t provide any ability for the fundraiser to be payment to be tracked. The crowdfunding platform is merely a platform to connect the fundraiser creator to the potential donors/contributors.
- Legally compliant payment system: To make the payment legally compliant, no real payments are executed. All payments will be made using a dummy account.

### 📝 Future Scope

- [ ] Add credit score to every individual or business using Machine Learning.
- [ ] Add options to accept funding made with NFTs and digital currency.
