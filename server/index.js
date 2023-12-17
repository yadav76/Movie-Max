const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express(); //makes object of Express
require("dotenv").config(); //allow us to use .evn variables
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); //to use jwt token
const bcrypt = require("bcrypt");
const cors = require("cors");
app.use(cors()); //allow cross Origin connections

app.use(express.json()); //to convert http data to String form

//export MongoDb
const user = require("./Models/User");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const SALT_ROUNDS = 5;

app.get("/dummy", (req, res) => {
  console.log("dummy API");

  return res.status(200).send("Dummy ApI");
});

//Now make an api for User Register
app.post("/register", async (req, res) => {
  const userBody = req.body;
  const SALT_ROUNDS = 10;

  const hashedPassword = await bcrypt.hash(userBody.password, SALT_ROUNDS); //this will convert the password into secure password

  console.log(hashedPassword);

  const userObj = new user({
    name: userBody.name,
    password: hashedPassword,
    email: userBody.email,
  });

  await userObj.save(); //to save the userObj to Database

  return res.status(201).send("User Registered Successfully");
});

//Now make JWT Authentication
app.post("/login", async (req, res) => {
  const userBody = req.body;

  let userData;

  try {
    userData = await user.findOne({ email: userBody.email });

    //If user name does not exist in database
    if (userData == null) {
      return res.status(200).send({
        status: 400,
        message: "Please enter Correct Email",
      });
    }
  } catch (err) {
    return res.send("error in Fetching Data");
  }

  //check for user password and Database password
  let isPasswordSame;

  try {
    isPasswordSame = await bcrypt.compare(userBody.password, userData.password);
  } catch (err) {
    return res.send("error in Fetching Data");
  }

  let payload = {
    email: userData.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRETKEY); //convert Jwt payload and to

  if (isPasswordSame) {
    return res.status(200).send({
      status: 200,
      message: "User Successfully Logged In",
      token: token,
    });
  } else {
    //if both password are not same
    res.status(200).send({
      status: 400,
      message: "please enter Correct password",
    });
  }
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDb is Connected");
  })
  .catch((err) => {
    console.log("Error in MongoDB Connection");
  });

app.listen(PORT, () => {
  console.log("App is Running on Port:", PORT);
});
