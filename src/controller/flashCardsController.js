import pool from "../config/db.js";
import parseDocumentWithGroq from "../utils/groq.js";

//Show flashCards by folder_id
export const getAllFlashCardsByFolderId = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, question, answer FROM flash_cards WHERE folder_id = $1",
      [req.params.folderId]
    );

    if (result.rows[0].length == 0) {
      return res.status(400).json({ message: "Empty folder" });
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
      pool.query(
        "INSERT INTO flash_cards (question, answer, folder_id ) VALUES ($1, $2, $3) RETURNING",
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
    res.status(400).json({ message: "Erro creating Flash Cards", error });
  }
};
