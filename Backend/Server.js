require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const DB = require("./Database");
const Contact = require("./models/ContactSchema.js");
const User = require("./models/UserSchema");

const app = express();
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/sendmail", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, mail, subject, info, userId } = req.body;

  const newContact = new Contact({
    firstName,
    lastName,
    mail,
    subject,
    info,
    userId,
  });

  await newContact.save();

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.SUPPORT_EMAIL, // The email you want to send to
    subject: "New contact form submission from " + firstName + " " + lastName,
    text: "Name: " + firstName + " " + lastName + "\nEmail: " + mail + "\nOption: " + subject + "\nInfo: " + info,
  };

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

app.post('/register', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const newUser = new User({
      email,
      password
  });

  await newUser.save();

  res.status(200).send('User successfully registered');
});

app.post('/login', async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user && user.password === req.body.password) {
      res.status(200).json({ userId: user._id.toString() });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next("Server use Header Error");
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  DB();
  console.log(`Server running on port ${PORT}`);
});
