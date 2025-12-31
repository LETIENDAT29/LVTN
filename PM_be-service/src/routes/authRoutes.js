import express from 'express';
import {
    register,
    login,
    logout,
    me,
    refresh,
    getAllUsers,
} from '../controllers/authController.js';
import { isAdmin, verifyToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', verifyToken, logout);
router.get('/me', verifyToken, me);
router.get('/alluser', isAdmin, getAllUsers);

// 🔐 Ví dụ route chỉ cho admin
router.get('/admin-only', verifyToken, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Xin chào admin!' });
});

export default router;
