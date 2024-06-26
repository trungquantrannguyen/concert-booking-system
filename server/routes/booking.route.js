import express from "express";
import {
  getAllUserBooking,
  selectBooking,
  confirmBooking,
  createBooking,
} from "../controllers/booking.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/:id", verifyToken, getAllUserBooking);
router.get("/:id/:bookingID", verifyToken, selectBooking);
router.post("/", verifyToken, confirmBooking);
router.post("/create", verifyToken, createBooking);

export default router;
