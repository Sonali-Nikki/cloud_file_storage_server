import express from "express";
import { uploadFile,renameFile,deleteFile } from "../controllers/file.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", protect, uploadFile);
router.patch("/rename/:id", protect, renameFile);
router.delete("/delete/:id", protect, deleteFile);

export default router;
