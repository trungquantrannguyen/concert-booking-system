import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviewsFromConcert,
  updateReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/:concertID", getAllReviewsFromConcert);
router.post("/", verifyToken, createReview);
router.delete("/:id/:reviewID", verifyToken, deleteReview);
router.put("/:userID/:reviewID", verifyToken, updateReview);

export default router;
