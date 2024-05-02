import express from "express";
import {
  SignIn,
  SignUp,
  SignOut,
  test,
  DeleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/signout", SignOut);
router.delete("/delete/:id", verifyToken, DeleteUser);

export default router;
