import express from "express";
import { getTicketsfromBooking } from "../controllers/ticket.controller.js";

const router = express.Router();

router.get("/:bookingID", getTicketsfromBooking);

export default router;
