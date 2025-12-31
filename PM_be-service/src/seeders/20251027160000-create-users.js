'use strict';
import bcrypt from 'bcrypt';

export async function up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert('Users', [
        {
            fullName: 'Admin PET Monitor',
            phone: '0909999999',
            email: 'admin@petmonitor.com',
            address: 'Hà Nội, Việt Nam',
            password: passwordHash,
            role: 'admin',
            avatar: 'https://i.pravatar.cc/150?img=1',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            fullName: 'Nguyễn Văn A',
            phone: '0908888888',
            email: 'user@petmonitor.com',
            address: 'TP.HCM, Việt Nam',
            password: passwordHash,
            role: 'user',
            avatar: 'https://i.pravatar.cc/150?img=2',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
}
