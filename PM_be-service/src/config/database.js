import { Sequelize } from 'sequelize';

// Kết nối PostgreSQL

const sequelize = new Sequelize(

    process.env.DB_NAME || 'petmonitor_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || '123456789',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
        logging: false,
    }
);

export default sequelize;

