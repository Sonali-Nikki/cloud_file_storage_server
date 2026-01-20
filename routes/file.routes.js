import express from "express";
import { uploadFile,getFiles,moveToTrash,getTrash,restoreFile ,deleteForever} from "../controllers/file.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", protect, uploadFile);
router.get("/", protect, getFiles);
router.patch("/trash/:id", protect, moveToTrash);
router.get("/trash/all", protect, getTrash);
router.patch("/restore/:id", protect, restoreFile);
router.delete("/delete/:id", protect, deleteForever);

export default router;
