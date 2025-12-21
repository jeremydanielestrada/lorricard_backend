import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookieOptions } from "../utils/cookie.js";
import { userModel } from "../models/user.js";
import pool from "../config/db.js";

const { findUserByEmail, createUser } = userModel();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const setCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction, // true in production
    sameSite: isProduction ? "none" : "lax", // "none" for cross-origin in production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  };
};

//register
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password || !role) {
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
      hashedPassword,
      role
    );

    const token = generateToken(newUser.id);

    res.cookie("token", token, setCookieOptions());
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: '"Please provide all required fields"' });
    }

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const userData = user.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password); // compare password

    if (!isMatch) {
      return res.status(400).json({ message: "Inavalid Password" });
    }

    const token = generateToken(userData.id);

    res.cookie("token", token, setCookieOptions());

    res.status(200).json({
      user: {
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        role: userData.role,
      },
      message: {
        message: "Logged in successfully",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//logout
export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
