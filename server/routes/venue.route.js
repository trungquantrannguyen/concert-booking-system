import express from "express";
import {
  createVenue,
  deleteVenue,
  getAllVenues,
  selectVenue,
  updateVenue,
} from "../controllers/venue.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getAllVenues);
router.get("/:venueID", selectVenue);
router.post("/:id", verifyToken, createVenue);
router.put("/:id/:venueID", verifyToken, updateVenue);
router.delete("/:id/:venueID", verifyToken, deleteVenue);

export default router;
