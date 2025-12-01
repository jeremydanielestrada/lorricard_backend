import pool from "../config/db.js";

export const userModel = () => {
  const findUserByEmail = async (email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  };

  const createUser = async (firstName, lastName, email, password) => {
    const result = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
      [firstName, lastName, email, password]
    );
    return result.rows[0];
  };

  const findUserById = async (id) => {
    const result = await pool.query(
      "SELECT id, first_name, last_name, email FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  };

  return {
    findUserByEmail,
    createUser,
    findUserById,
  };
};
