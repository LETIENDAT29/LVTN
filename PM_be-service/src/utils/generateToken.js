import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
        console.error('❌ JWT_SECRET is missing in .env');
        throw new Error('JWT secret not found');
    }

    return jwt.sign(
        { id: user.id, phone: user.phone, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};
