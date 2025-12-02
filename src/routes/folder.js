import express from "express";
import {
  getAllFoldersByOwner,
  createFolder,
} from "../controller/folderController.js";
import { protect } from "../middleware/authMiddleware.js";

export const folderRouter = express.Router();

//View Folder
folderRouter.get("/view", protect, getAllFoldersByOwner);

//Create Folder
folderRouter.post("/create", protect, createFolder);
