import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate the name, email, password
    if (!name) {
      return res.status(404).send({
        success: false,
        message: "Please enter a name...",
      });
    }
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Please enter a valid email...",
      });
    }
    if (!password) {
      return res.status(404).send({
        success: false,
        message: "Please enter password...",
      });
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // check if the user with the email is already registered
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User is already registered with us, please login",
      });
    }

    // else create a new user
    const newUser = new userModel({ name, email, password: hashedPassword });

    const isUserAdded = await newUser.save();
    if (!isUserAdded) {
      res.status(500).send({
        success: false,
        message: "Registration failed",
      });
    }

    res.status(200).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in register controller",
      err,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate the email and password
    if (!email) {
      return res.status(404).send({
        success: false,
        message: "Please enter a valid email address",
      });
    }
    if (!password) {
      return res.status(404).send({
        success: false,
        message: "Please enter a valid password",
      });
    }

    // check if the user exists or not
    const existingUser = await userModel.findOne({ email });
    // if the user doesnt exist ask them to register first
    if (!existingUser) {
      return res.status(403).send({
        success: false,
        message: "Please register first",
      });
    }

    // compare the password
    const match = await comparePassword(password, existingUser.password);
    if (!match) {
      return res.status(403).send({
        success: false,
        message: "Please enter the correct password",
      });
    }

    // password match then create the jwt token
    const token = await jwt.sign(
      {
        _id: existingUser._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).send({
      success: true,
      message: "Successfully logged in",
      user: {
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in login controller",
      err,
    });
  }
};

export const testController = async (req, res) => {
  console.log("Yes logged in:- ");
};


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY1ZGVjNWFiNzdlZTIyMDYwYjY2YTgiLCJpYXQiOjE2OTM4MzQ5NjgsImV4cCI6MTY5Mzg0MjE2OH0.GGKO-qEHvk0znOIHUVxj9Nq3u0WbKcT9_fSfDnIxiM4

