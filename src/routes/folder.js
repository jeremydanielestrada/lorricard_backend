import express from "express";
import {
  getAllFoldersByOwner,
  createFolder,
  updateFolder,
} from "../controller/folderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isOwner } from "../middleware/isOwner.js";

export const folderRouter = express.Router();

//View Folder
folderRouter.get("/view", protect, getAllFoldersByOwner);

//Create Folder
folderRouter.post("/create", protect, createFolder);

//Update folder
folderRouter.put("/update/:folderId", protect, isOwner, updateFolder);
