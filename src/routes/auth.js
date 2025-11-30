import express from "express";
import { register } from "../controller/authController";

const router = express.Router();

//Register
router.post("/register", register);
