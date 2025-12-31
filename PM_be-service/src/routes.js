import express from 'express';
import multer from 'multer';
import axios from 'axios';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Route test
router.get('/', (req, res) => {
    res.send('🐾 PM_be-service is running!');
});

// Nhận ảnh từ app và gửi sang AI service để phân tích
router.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        const aiResponse = await axios.post('http://localhost:8000/predict', req.file.buffer, {
            headers: { 'Content-Type': 'application/octet-stream' },
        });
        res.json(aiResponse.data);
    } catch (error) {
        console.error('❌ AI request failed:', error.message);
        res.status(500).json({ error: 'AI service not responding' });
    }
});

export default router;

