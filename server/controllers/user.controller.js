import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({
    message: "API test success",
  });
};

export const SignUp = async (req, res) => {
  const { username, password, email, phoneNumber, gender, dob } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email,
    phoneNumber,
    gender,
    dob,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
  }
};
