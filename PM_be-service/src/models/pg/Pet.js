import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Pet = sequelize.define('Pet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    species: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'pets',
    timestamps: true,
});

export default Pet;
