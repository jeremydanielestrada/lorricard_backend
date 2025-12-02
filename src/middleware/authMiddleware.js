import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifies the token

    const user = await pool.query(
      "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
      [decoded.id]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Not authorized, token failed" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await pool.query("SELECT role FROM users WHERE id = $1", [
      req.user.id,
    ]);

    if (user.rows.length === 0 || user.rows[0].role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin role required" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error checking admin privileges" });
  }
};
