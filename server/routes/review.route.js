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
router.post("/:id", verifyToken, createReview);
router.delete("/adminID/:id", verifyToken, deleteReview);
router.put("/:userID/:id", verifyToken, updateReview);

export default router;
