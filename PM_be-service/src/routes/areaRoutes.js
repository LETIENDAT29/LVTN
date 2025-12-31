import express from 'express';
import {
    createArea,
    assignUserToArea,
    getAreasOfUser,
    getAllAreas
} from '../controllers/areaController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Tạo khu vực mới
router.post('/', createArea);
// Phân công user
router.put('/:id/assign', assignUserToArea);
// Lấy khu vực của user
router.get('/areasuser', verifyToken, getAreasOfUser);

router.get('/all', getAllAreas);

export default router;
