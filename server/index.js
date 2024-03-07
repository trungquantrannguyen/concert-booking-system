import express from "express";
import { PORT } from "./config.js";
import userRouter from "./routes/user.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
