import express from "express";
import {
  SignIn,
  SignUp,
  SignOut,
  test,
  DeleteUser,
  updateUser,
  GetUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.get("/:UserID", GetUser);
router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/signout", SignOut);
router.delete("/delete/:id", verifyToken, DeleteUser);
router.put("/:id", verifyToken, updateUser);

export default router;
