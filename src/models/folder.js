import pool from "../config/db.js";

export const folderModel = () => {
  const createFolder = async (title) => {
    const result = pool.query(
      "INSERT INTO folders (title) VALUES (1$) RETURNING title",
      [title]
    );

    return result.rows[0];
  };

  return { createFolder };
};
