import express from "express";
import { upload } from "../middleware/fileUploadMiddleware.js";
import {
  getAllFlashCardsByFolderId,
  createFlashCardsFromDocument,
  createFlashCardsByFileUpload,
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

flashCardRouter.post(
  "/upload/:folderId",
  protect,
  upload.single("file"),
  createFlashCardsByFileUpload
);

export default flashCardRouter;
