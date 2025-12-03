import pool from "../config/db.js";

//View Folder
export const getAllFoldersByOwner = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, user_id, created_at 
       FROM folders 
       WHERE user_id= $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Empty folder" });
    }

    const folders = result.rows; //Return all folders
    res.status(200).json({
      folders,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Unable to fetch folder", error });
  }
};

export const createFolder = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Please provide some title" });
    }

    const result = await pool.query(
      "INSERT INTO folders (title, user_id) VALUES ($1, $2) RETURNING id, title, user_id",
      [title, req.user.id]
    );
    res.status(201).json(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    return res.status(400).json({ message: "Unable to create folder", error });
  }
};

export const updateFolder = async (req, res) => {
  try {
    const { title } = req.body;

    const result = await pool.query(
      "UPDATE folders SET title = $1 WHERE id = $2",
      [title, req.params.folderId]
    );

    res.status(201).json({ message: "Folder updated succesfully" });
    return result.rows[0];
  } catch (error) {
    return res.status(400).json({ message: "Unable to create folder", error });
  }
};
