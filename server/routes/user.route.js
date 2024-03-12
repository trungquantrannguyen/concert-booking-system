import express from "express";
import { SignUp, test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signup", SignUp);

export default router;
