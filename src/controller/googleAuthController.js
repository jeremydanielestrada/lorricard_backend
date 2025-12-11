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
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE google_id = $1",
      [sub]
    );

    let user;

    if (existingUser.rows.length === 0) {
      const result = await pool.query(
        "INSERT INTO users (first_name, last_name, email, google_id) VALUES ($1, $2, $3, $4) RETURNING first_name, last_name, email, google_id",
        [given_name, family_name, email, sub]
      );
      user = result.rows[0];
    } else {
      user = existingUser.rows[0];
    }

    const token = generateToken(user.google_id, user.email);

    res.cookie("token", token, cookieOptions);
    res.json({ jwt: token, user });
  } catch (error) {
    return res.status(400).json({
      message: "Error authenticating to Google",
      error: error.message,
    });
  }
};
