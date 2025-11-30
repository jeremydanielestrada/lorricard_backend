import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookieOptions } from "../utils/cookie.js";
import { userModel } from "../models/user.js";

const { findUserByEmail, createUser } = userModel();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//register
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userExists = await findUserByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(
      first_name,
      last_name,
      email,
      hashedPassword
    );

    const token = generateToken(newUser.id);

    res.cookie("token", token, cookieOptions);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
