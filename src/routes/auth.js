import express from "express";
import { register, login, logout } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Register
router.post("/register", register);

//Login
router.post("/login", login);

//Logout
router.post("logout/", logout);

//
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

export default router;
