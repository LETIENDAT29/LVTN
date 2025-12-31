'use strict';

export async function up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'totalLine', {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
    });

    await queryInterface.addColumn('Users', 'objectDetected', {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {}
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'totalLine');
    await queryInterface.removeColumn('Users', 'objectDetected');
}

