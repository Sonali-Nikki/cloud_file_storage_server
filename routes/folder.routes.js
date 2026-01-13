import express from "express";
import {
  createFolder,
  getFolderContents,
  deleteFolder
} from "../controllers/folder.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createFolder);
router.get("/:id", protect, getFolderContents);
router.delete("/:id", protect, deleteFolder);

export default router;
