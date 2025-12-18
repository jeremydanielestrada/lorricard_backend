import express from "express";
import {
  getAllFoldersByOwner,
  createFolder,
  updateFolder,
  deleteFolder,
  getOrCreateUntitledFolder,
} from "../controller/folderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isOwner } from "../middleware/isOwner.js";

export const folderRouter = express.Router();

//View Folder
folderRouter.get("/view", protect, getAllFoldersByOwner);

//default folder
folderRouter.get("/untitled", protect, getOrCreateUntitledFolder);

//Create Folder
folderRouter.post("/create", protect, createFolder);

//Update folder
folderRouter.put("/update/:folderId", protect, isOwner, updateFolder);

//Delete folder
folderRouter.delete("/delete/:folderId", protect, isOwner, deleteFolder);
