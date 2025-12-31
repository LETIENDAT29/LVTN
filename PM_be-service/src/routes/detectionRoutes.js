import express from "express";
import { createDetection, getDetections } from "../controllers/detectionController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createDetection);
router.get("/", getDetections);

export default router;
