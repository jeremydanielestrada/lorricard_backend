import pool from "../config/db.js";
import parseDocumentWithGroq from "../utils/groq.js";
import { parseFile } from "../utils/Pasrser.js";

//Show flashCards by folder_id
export const getAllFlashCardsByFolderId = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, question, answer, folder_id FROM flash_cards WHERE folder_id = $1 ORDER BY created_at DESC",
      [req.params.folderId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "No flashcards found" });
    }
    res.status(200).json({ flash_cards: result.rows });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occured while fetching flash cards", error });
  }
};

export const createFlashCardsFromDocument = async (req, res) => {
  try {
    const { document } = req.body;

    const parsedFlashcards = await parseDocumentWithGroq(document);

    const insertPromises = parsedFlashcards.map(({ question, answer }) => {
      return pool.query(
        "INSERT INTO flash_cards (question, answer, folder_id ) VALUES ($1, $2, $3) RETURNING id, question, answer, folder_id",
        [question, answer, req.params.folderId]
      );
    });

    const results = await Promise.all(insertPromises);
    const flashcards = results.map((r) => r.rows[0]);

    res.status(201).json({
      message: "Flashcards created successfully",
      flash_cards: flashcards,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating Flash Cards", error: error.message });
  }
};

export const createFlashCardsByFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse the file content
    const documentText = await parseFile(req.file);

    if (!documentText || documentText.trim().length === 0) {
      return res.status(400).json({ message: "File is empty or unreadable" });
    }

    // Use Groq AI to parse into flashcards
    const parsedFlashcards = await parseDocumentWithGroq(documentText);

    // Insert flashcards into database
    const insertPromises = parsedFlashcards.map(({ question, answer }) => {
      return pool.query(
        "INSERT INTO flash_cards (question, answer, folder_id) VALUES ($1, $2, $3) RETURNING id, question, answer, folder_id",
        [question, answer, req.params.folderId]
      );
    });

    const results = await Promise.all(insertPromises);
    const flashcards = results.map((r) => r.rows[0]);

    res.status(201).json({
      message: "Flashcards created successfully from file",
      flash_cards: flashcards,
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(400).json({
      message: "Error creating flashcards from file",
      error: error.message,
    });
  }
};
