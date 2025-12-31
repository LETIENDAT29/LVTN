module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "lastUpdateDate", {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Users", "lastUpdateDate");
  }
};
