import express from "express";
import {
  createConcert,
  deleteConcert,
  getAllConcerts,
  selectConcert,
  updateConcert,
} from "../controllers/concert.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getAllConcerts);
router.get("/:id", selectConcert);
router.post("/:id", verifyToken, createConcert);
router.delete("/:id/:concertID", verifyToken, deleteConcert);
router.put("/:id/:concertID", verifyToken, updateConcert);

export default router;
