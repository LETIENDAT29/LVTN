import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'Thiếu token xác thực' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // gắn user.id, user.role vào req
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Chỉ admin mới được phép truy cập' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Lỗi xác thực admin' });
    }
};
