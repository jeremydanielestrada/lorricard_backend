import express from "express";
import {
  getAllFlashCardsByFolderId,
  createFlashCardsFromDocument,
} from "../controller/flashCardsController";
import { protect } from "../middleware/authMiddleware";

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
