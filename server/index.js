import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import bookingRouter from "./routes/booking.route.js";
import concertRouter from "./routes/concert.route.js";
import reviewRouter from "./routes/review.route.js";
import artistRouter from "./routes/artist.route.js";
import venueRouter from "./routes/venue.route.js";
import ticketRouter from "./routes/ticket.route.js";

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

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/concert", concertRouter);
app.use("api/review", reviewRouter);
app.use("api/artist", artistRouter);
app.use("api/venue", venueRouter);
app.use("api/ticket", ticketRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
