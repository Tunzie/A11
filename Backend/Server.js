// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const DB = require("./Database"); // Import the database connection function
const Contact = require("./models/ContactSchema.js"); // Import the Contact schema
const User = require("./models/UserSchema"); // Import the User schema

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

const cors = require("cors");
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Configure the transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Route to handle sending emails
app.post("/sendmail", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, mail, subject, info, userId } = req.body;

  // Create a new contact document
  const newContact = new Contact({
    firstName,
    lastName,
    mail,
    subject,
    info,
    userId,
  });

  // Save the contact document to the database
  await newContact.save();

  // Mail options for the email to be sent
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.SUPPORT_EMAIL, // The email you want to send to
    subject: "New contact form submission from " + firstName + " " + lastName,
    text: "Name: " + firstName + " " + lastName + "\nEmail: " + mail + "\nOption: " + subject + "\nInfo: " + info,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email successfully sent");
    }
  });
});

// Route to handle user registration
app.post('/register', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Create a new user document
  const newUser = new User({
      email,
      password
  });

  // Save the user document to the database
  await newUser.save();

  res.status(200).send('User successfully registered');
});

// Route to handle user login
app.post('/login', async (req, res) => {
  console.log(req.body.email);
  try {
    // Find the user in the database
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user && user.password === req.body.password) {
      // If user is found and password matches, send back user ID
      res.status(200).json({ userId: user._id.toString() });
    } else {
      // If credentials are invalid, send a 401 response
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    // If an error occurs, send a 500 response
    res.status(500).send('Internal Server Error');
  }
});

// Route to check if the server is running
app.get('/', function(req, res) {
  res.send('Server is Up!')
})

// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send('Server Error');
});

// Start the server and connect to the database
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  DB(); // Connect to the database
  console.log(`Server running on port ${PORT}`);
});