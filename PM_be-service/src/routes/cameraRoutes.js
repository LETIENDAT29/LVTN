import express from "express";
import { getCameras, getCameraById } from "../controllers/cameraController.js";

const router = express.Router();

// Lấy toàn bộ camera
router.get("/", getCameras);

// Lấy camera theo ID
router.get("/:id", getCameraById);

export default router;