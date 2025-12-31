import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, phone: user.phone, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // token ngắn hạn
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

export const register = async (req, res) => {
    try {
        const { fullName, phone, email, address, password, role, avatar } = req.body;

        // Kiểm tra trùng số điện thoại hoặc email
        const existingUser = await User.findOne({
            where: { phone }
        });
        const existingEmail = await User.findOne({
            where: { email }
        });

        if (existingUser)
            return res.status(400).json({ message: 'Số điện thoại đã tồn tại' });
        if (existingEmail)
            return res.status(400).json({ message: 'Email đã được sử dụng' });

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const user = await User.create({
            fullName,
            phone,
            email,
            address,
            password: hashedPassword,
            role: role || 'user',
            avatar: avatar || null,
        });

        res.status(200).json({
            message: 'Đăng ký tài khoản thành công',
            user: {
                id: user.id,
                fullName: user.fullName,
                phone: user.phone,
                email: user.email,
                role: user.role,
                address: user.address,
                avatar: user.avatar,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ where: { phone } });
        if (!user) return res.status(400).json({ message: 'Tài khoản không tồn tại' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Sai mật khẩu' });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Lưu refresh token vào DB hoặc Redis, ở đây lưu tạm vào user
        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            message: 'Đăng nhập thành công',
            accessToken,
            refreshToken,
            user: { id: user.id, phone: user.phone, role: user.role },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.status(401).json({ message: 'Thiếu refresh token' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user || user.refreshToken !== refreshToken)
            return res.status(403).json({ message: 'Refresh token không hợp lệ' });

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({
            message: 'Token đã được làm mới',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (err) {
        res.status(403).json({ message: 'Refresh token không hợp lệ hoặc hết hạn' });
    }
};

export const logout = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findByPk(id);
        if (user) {
            user.refreshToken = null;
            await user.save();
        }
        res.json({ message: 'Đăng xuất thành công' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const me = async (req, res) => {
    try {
        // Kiểm tra xem middleware xác thực JWT đã thêm user vào req chưa
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }

        // Lấy toàn bộ thông tin người dùng (trừ mật khẩu để bảo mật)
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] } // loại bỏ cột password
        });

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        res.json(user);
    } catch (err) {
        console.error('Lỗi lấy thông tin người dùng:', err);
        res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'fullName', 'email', 'phone', 'role', 'address', 'createdAt'],
        });
        res.json({ success: true, users });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách user:', error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách người dùng' });
    }
};

