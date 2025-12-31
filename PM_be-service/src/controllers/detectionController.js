import Detection from "../models/mongo/Detection.js";
import { User } from "../models/index.js";


export const createDetection = async (req, res) => {
    try {
        const { deviceLocation, objectLocation, label, confidence } = req.body;

        if (!label) {
            return res.status(400).json({ message: "Missing label" });
        }

        // --------------------------------------------------
        // 1️⃣ LƯU DỮ LIỆU DETECTION VÀO MONGODB
        // --------------------------------------------------
        const detection = new Detection({
            deviceLocation,
            objectLocation,
            label,
            confidence,
            userId: req.user.id     // lưu user để truy vấn sau này
        });

        await detection.save();

        // --------------------------------------------------
        // 2️⃣ TĂNG SỐ LƯỢNG OBJECT DETECT TRONG POSTGRES
        // --------------------------------------------------
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const obj = user.objectDetected || {};

        // Tăng số lượng cho loại object
        obj[label] = (obj[label] || 0) + 1;

        // Lưu lại vào PostgreSQL
        await User.update(
            { objectDetected: obj },
            { where: { id: user.id } }
        );

        // --------------------------------------------------
        // 3️⃣ TRẢ KẾT QUẢ
        // --------------------------------------------------
        return res.status(201).json({
            success: true,
            message: "Detection saved and user object count updated!",
            detection,
            objectDetected: obj
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
};


// GET /api/detections
export const getDetections = async (req, res) => {
    try {
        const detections = await Detection.find()
            .sort({ timestamp: -1 })
            .limit(50);

        return res.json(detections);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Lấy detection thất bại"
        });
    }
};
