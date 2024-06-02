import express from "express";
import {
  getAllUserBooking,
  selectBooking,
  createBooking,
} from "../controllers/booking.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get(":id", verifyToken, getAllUserBooking);
router.get("/:id/:bookingID", verifyToken, selectBooking);
router.post("/", createBooking);

export default router;
