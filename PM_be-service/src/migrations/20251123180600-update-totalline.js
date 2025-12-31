export async function up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'totalLine');

    await queryInterface.addColumn('Users', 'totalLine', {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {
            day1: 0,
            day2: 0,
            day3: 0,
            day4: 0,
            day5: 0,
            day6: 0,
            day7: 0,
            total: 0
        }
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'totalLine');

    await queryInterface.addColumn('Users', 'totalLine', {
        type: Sequelize.FLOAT,
        defaultValue: 0
    });
}
