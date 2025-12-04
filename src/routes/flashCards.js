import express from "express";
import {
  getAllFlashCardsByFolderId,
  createFlashCardsFromDocument,
} from "../controller/flashCardsController.js";
import { protect } from "../middleware/authMiddleware.js";

const flashCardRouter = express.Router();

flashCardRouter.get(
  "/get-flash-cards/:folderId",
  protect,
  getAllFlashCardsByFolderId
);

flashCardRouter.post(
  "/create-flash-card/:folderId",
  protect,
  createFlashCardsFromDocument
);

export default flashCardRouter;
