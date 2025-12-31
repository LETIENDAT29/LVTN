import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const addDetectedObject = async (req, res) => {
    try {
        const { type } = req.body;

        if (!type) {
            return res.status(400).json({ message: "Missing object type!" });
        }

        // 🔥 Lấy user thật từ DB bằng ID trong token
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // 🔥 Lấy dữ liệu hiện tại
        const currentData = user.objectDetected || {};

        // 🔥 Tăng số lượng theo type
        currentData[type] = (currentData[type] || 0) + 1;

        // 🔥 Update vào DB đúng cách
        await User.update(
            { objectDetected: currentData },
            { where: { id: user.id } }
        );

        return res.status(200).json({
            message: "Object updated!",
            objectDetected: currentData
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



export const updateTotalLine = async (req, res) => {
    try {
        const { distance } = req.body;

        if (distance == null || isNaN(distance)) {
            return res.status(400).json({ message: "Missing or invalid distance!" });
        }

        // Lấy user từ DB bằng ID trong token
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        let totalLine = user.totalLine || {
            day1: 0,
            day2: 0,
            day3: 0,
            day4: 0,
            day5: 0,
            day6: 0,
            day7: 0,
            total: 0
        };

        const today = new Date().toDateString();
        const lastDate = user.lastUpdateDate || today;

        // Nếu sang ngày mới → shift dữ liệu
        if (today !== lastDate) {
            totalLine.day7 = totalLine.day6;
            totalLine.day6 = totalLine.day5;
            totalLine.day5 = totalLine.day4;
            totalLine.day4 = totalLine.day3;
            totalLine.day3 = totalLine.day2;
            totalLine.day2 = totalLine.day1;
            totalLine.day1 = 0; // reset hôm nay
        }

        // Cộng dồn distance vào day1 hôm nay
        totalLine.day1 += distance;

        // Cộng dồn tổng toàn thời gian (không phải 7 ngày)
        totalLine.total += distance;

        // UPDATE vào database
        await User.update(
            {
                totalLine,
                lastUpdateDate: today,
            },
            {
                where: { id: user.id }
            }
        );

        return res.status(200).json({
            message: "Total line updated!",
            totalLine
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
