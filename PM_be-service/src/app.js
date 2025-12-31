import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js'; // 🔥 import sequelize
import router from './routes/authRoutes.js';
// MongoDB
import './config/mongo.js';
import detectionRouter from './routes/detectionRoutes.js';
import areaRoutes from './routes/areaRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cameraRoutes from './routes/detectionRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', router);
app.use('/api/detections', detectionRouter);
app.use('/api/areas', areaRoutes);
app.use('/api/users', userRoutes);
app.use("/api/cameras", cameraRoutes);



// 🔥 Kiểm tra kết nối đến PostgreSQL
async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('✅ Kết nối PostgreSQL thành công!');
        // Tùy chọn: Đồng bộ model
        await sequelize.sync({ alter: true });
        console.log('📦 Sequelize đã đồng bộ database!');
    } catch (error) {
        console.error('❌ Lỗi kết nối database:', error);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 PM_be-service running at http://localhost:${PORT}`);
    await connectDatabase(); // Gọi hàm kết nối khi server khởi chạy
});



export default app;

