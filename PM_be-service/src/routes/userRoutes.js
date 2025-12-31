import express from "express";
import { isAdmin, verifyToken } from '../middlewares/authMiddleware.js';
import { addDetectedObject, updateTotalLine } from "../controllers/userController.js";

const router = express.Router();

// Cập nhật số object detect — cần token
router.post("/object/add", verifyToken, addDetectedObject);

router.post("/totalLine/update", verifyToken, updateTotalLine);

export default router;
