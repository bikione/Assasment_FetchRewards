# Assasment FetchReward By Bilguut

> Spend customer's point by oldest date first

# Structure of Code

Code is written in Node.JS. I used N-tier Architecture with Presentation, Logic, Data layers.
Code starts from app.js

Presentation layer - > in Router folder which gets request and sent to the controller.

Logic Layer -> in Controller folder which get request from routers and Build Data using Data Layer.

Data layer -> in Data folder which contains Schema of Customer and Customer points history Object.

# Schema

Order to make it more faster, I used Priority Queue to build the data. If we build data correctly "Spend" operation would be done easilly.

Data which has oldest timestamp is at front of Queue. Newest will be last.

Structuring data is handled by Data layers. Controller layer is only resposible for send data to the constructer

# API URL

Get Balance of All Customers : HTTP GET localhost:8080/api/customer/balance

Spend point by oldest date first : HTTP POST localhost:8080/api/customer/spend Body : {"points": xxx}

Add new customer point's history or add new customer : HTTP POST localhost:8080/api/customer Body: { "payer": "Bilguut", "points": -500 "timestamp": "2020-11-30T14:00:00Z" }

# To Start Application

Before start application install the modules using `npm install`
To start application use rather `npm start` or `npm run dev`.

Thank you Looking forward to hearing from you guys.
