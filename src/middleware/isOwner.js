import pool from "../config/db.js";

export const isOwner = async (req, res, next) => {
  const userId = req.user.id;

  const result = await pool.query("SELECT * FROM folders WHERE user_id = $1", [
    userId,
  ]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Folder not found" });
  }

  if (result.rows[0].user_id !== userId) {
    return res.status(403).json({ message: "Not allowed" });
  }

  next();
};
