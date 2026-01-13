import express from "express";
import { shareFile, accessSharedFile, searchFiles } from "../controllers/shareController.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:fileId", protect, shareFile);
router.get("/access/:token", accessSharedFile);
router.get("/search", protect, searchFiles);

export default router;
