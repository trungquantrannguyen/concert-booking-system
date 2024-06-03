import express from "express";
import {
  createVenue,
  getAllVenues,
  selectVenue,
  updateVenue,
} from "../controllers/venue.controller.js";

const router = express.Router();

router.get("/", getAllVenues);
router.get("/:venueID", selectVenue);
router.post("/", createVenue);
router.put("/:venueID", updateVenue);
router.delete("/:venueID");

export default router;
