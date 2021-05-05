const functions = require("firebase-functions");

const express = require("express"); 
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")("sk_test_51InUZYSGsopEONyr5U0OoqpvnhfsZAGfMMLL0f3d4YbEtFAKkwLBquRInTLy3XRIwpWElKt3m4lqKyATT06KWv4B00AOSTtdgs");

//Setting up API

//App config
const app = express();

//Middleware
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
//Dummy Route Check
app.get('/', (request, response) =>
     response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('BOOOOOM! Request Received for the amount >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    }) 
    //Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

//Listen command
exports.api = functions.https.onRequest(app);

//Example endpoint
//http://localhost:5001/clone-5922e/us-central1/api