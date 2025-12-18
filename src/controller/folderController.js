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

export const getOrCreateUntitledFolder = async (req, res) => {
  try {
    // Check if user already has an "Untitled" folder
    let result = await pool.query(
      "SELECT id, title, user_id FROM folders WHERE user_id = $1 AND title = $2",
      [req.user.id, "Untitled"]
    );

    // If not found, create one
    if (result.rows.length === 0) {
      result = await pool.query(
        "INSERT INTO folders (title, user_id) VALUES ($1, $2) RETURNING id, title, user_id",
        ["Untitled", req.user.id]
      );
    }

    res.status(200).json({
      folder: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({
      message: "Unable to get or create untitled folder",
      error,
    });
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
      "UPDATE folders SET title = $1 WHERE id = $2 RETURNING title",
      [title, req.params.folderId]
    );

    res.status(200).json({
      message: "Folder updated successfully",
      title: result.rows[0].title,
    });
  } catch (error) {
    return res.status(400).json({ message: "Unable to udpate folder", error });
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM folders WHERE id = $1 RETURNING id, title",
      [req.params.folderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json({
      message: "Folder deleted successfully",
      folder: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({ message: "Unable to delete folder", error });
  }
};
