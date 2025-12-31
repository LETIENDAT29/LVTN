import { Area, User } from '../models/index.js';

/**
 * Tạo khu vực mới
 */
export const createArea = async (req, res) => {
    try {
        const { name, coordinates, assignedTo } = req.body;

        const area = await Area.create({
            name,
            coordinates,
            assignedTo: assignedTo || null,
            status: assignedTo ? 'Đã phân công' : 'Chưa phân công'
        });

        res.status(201).json(area);
    } catch (error) {
        console.error('Lỗi tạo khu vực:', error);
        res.status(500).json({ message: 'Không thể tạo khu vực', error: error.message });
    }
};

/**
 * Phân công user cho khu vực
 */
export const assignUserToArea = async (req, res) => {
    try {
        const areaId = req.params.id;
        const { userId } = req.body;

        const area = await Area.findByPk(areaId);
        if (!area) return res.status(404).json({ message: 'Khu vực không tồn tại' });

        area.assignedTo = userId;
        area.status = 'Đã phân công';
        await area.save();

        res.json(area);
    } catch (error) {
        console.error('Lỗi phân công khu vực:', error);
        res.status(500).json({ message: 'Không thể phân công khu vực', error: error.message });
    }
};

/**
 * Lấy tất cả khu vực của 1 user
 */
// Lấy các khu vực của user hiện tại (dựa trên token)
export const getAreasOfUser = async (req, res) => {
    try {
        const user = req.user; // từ middleware xác thực token

        // Lấy tất cả khu vực của user, include thông tin user với alias đúng
        const areas = await Area.findAll({
            where: { assignedTo: user.id },
            include: [{
                model: User,
                as: 'assignedUser',
                attributes: ['id', 'fullName', 'phone', 'email']
            }]
        });

        res.json({
            user: {
                id: user.id,
                fullName: user.fullName,
                phone: user.phone,
                email: user.email
            },
            areas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy khu vực của user' });
    }
};


export const getAllAreas = async (req, res) => {
    try {
        const areas = await Area.findAll({
            include: [
                {
                    model: User,
                    as: 'assignedUser', // phải trùng alias trong association
                    attributes: ['id', 'fullName', 'phone', 'email']
                }
            ]
        });

        res.json({ areas });
    } catch (error) {
        console.error('Lỗi khi lấy tất cả khu vực:', error);
        res.status(500).json({ message: 'Lỗi khi lấy tất cả khu vực' });
    }
};
