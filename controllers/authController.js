import userModel from "../models/userModel.js";
import { hashPassword } from "../utils/hashPassword.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validate the name, email, password
        if(!name) {
            return res.status(404).send({
                success: false,
                message: "Please enter a name..."
            })
        }
        if(!email) {
            return res.status(404).send({
                success: false,
                message: "Please enter a valid email..."
            })
        }
        if(!password) {
            return res.status(404).send({
                success: false,
                message: "Please enter password..."
            })
        }

        // hash the password
        const hashedPassword = await hashPassword(password);

        // check if the user with the email is already registered
        const existingUser = await userModel.findOne({ email });

        if(existingUser) {
            return res.status(400).send({
                success: false,
                message: "User is already registered with us, please login"
            })
        }

        // else create a new user
        const newUser = new userModel({ name, email, password:hashedPassword });

        const isUserAdded = await newUser.save();
        if(!isUserAdded) {
            res.status(500).send({
                success: false,
                message: "Registration failed",
            })
        }

        res.status(200).send({
            success: true,
            message: "User registered successfully",
        })

    } catch(err) {
        res.status(500).send({
            success: false,
            message: "Error in register controller",
            err,
        })
    } 
}