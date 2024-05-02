import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

export const test = (req, res) => {
  res.json({
    message: "API test success",
  });
};

export const SignUp = async (req, res, next) => {
  try {
    const { username, password, email, phoneNumber, gender, dob } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const dobParsed = new Date(dob);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      gender,
      dob: dobParsed,
    });
    try {
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    next(err);
  }
};

export const SignIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const validUser = await User.findOne({ username });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassowd = bcryptjs.compareSync(password, validUser.password);
    if (!validPassowd)
      return next(errorHandler(401, "Incorrect user or password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

export const SignOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

export const DeleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own  account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};
