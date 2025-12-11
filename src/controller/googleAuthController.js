import { OAuth2Client } from "google-auth-library";
import { cookieOptions } from "../utils/cookie.js";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const continueToGoogleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Credential is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub } = payload;

    //check if user exist in DB
    console.log("Checking if user exists...");
    const existingUser = await pool.query(
      "SELECT id, first_name, last_name, email, google_id FROM users WHERE google_id = $1",
      [sub]
    );

    console.log(
      "Query result:",
      existingUser.rows.length > 0 ? "User found" : "User not found"
    );

    let user;

    if (existingUser.rows.length === 0) {
      console.log("Creating new user...");
      const result = await pool.query(
        "INSERT INTO users (first_name, last_name, email, google_id) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email, google_id",
        [given_name, family_name, email, sub]
      );
      user = result.rows[0];
      console.log("New user created:", user);
    } else {
      user = existingUser.rows[0];
      console.log("Existing user:", user);
    }

    console.log("User object:", user); // ADD THIS - Check what's in user
    console.log("Generating token with ID:", user.id); // ADD THIS

    const token = generateToken(user.id, user.email); // MUST use user.id, NOT user.google_id

    console.log("Setting cookie and sending response...");
    res.cookie("token", token, cookieOptions);
    res.json({ jwt: token, user });
  } catch (error) {
    return res.status(400).json({
      message: "Error authenticating to Google",
      error: error.message,
    });
  }
};
