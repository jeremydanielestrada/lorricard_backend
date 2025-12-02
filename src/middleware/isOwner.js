import pool from "../config/db.js";

///FOR OWNERSHIP VERIFICATION (eg.. Update ,Delete or View)
export const isOwner = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const folderId = req.params.folderId; // Get specific folder ID

    const result = await pool.query(
      "SELECT user_id FROM folders WHERE id = $1",
      [folderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    if (result.rows[0].user_id !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
