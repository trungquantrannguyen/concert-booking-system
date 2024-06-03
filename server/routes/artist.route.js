import express from "express";
import {
  createArtist,
  deleteArtist,
  getAllArtist,
  selectArtist,
  updateArtist,
} from "../controllers/artist.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", getAllArtist);
router.get("/:id", selectArtist);
router.post("/:id", verifyToken, createArtist);
router.delete("/:id/:artistID", verifyToken, deleteArtist);
router.put("/:artistID", verifyToken, updateArtist);

export default router;
