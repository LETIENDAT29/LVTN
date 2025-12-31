import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './pg/User.js';
import AreaModel from './pg/Area.js'; // import model Area

dotenv.config();


// Tạo kết nối Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false, // tắt log SQL nếu không cần
    }
);

// Khởi tạo models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Area = AreaModel(sequelize, Sequelize.DataTypes);

// // Thiết lập quan hệ
User.hasMany(Area, { foreignKey: 'assignedTo', as: 'areas' }); // 1 User -> N Area
Area.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignedUser' }); // 1 Area -> 1 User

// User.hasMany(Area, { foreignKey: 'userId', as: 'areas' });
// Area.belongsTo(User, { foreignKey: 'userId', as: 'assignedUser' });


// Gom tất cả models vào object
const db = {
    sequelize,
    Sequelize,
    User,
    Area,
};

export { db, User, Area };
export default db;
