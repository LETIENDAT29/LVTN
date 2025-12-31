// models/Area.js
'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Area extends Model {
        static associate(models) {
            // Một Area thuộc về một User (assignedTo)
            Area.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignedUser' });
        }
    }

    Area.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            coordinates: {
                type: DataTypes.JSON, // Lưu polygon dạng JSON [{latitude, longitude}, ...]
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Chưa phân công'
            },
            assignedTo: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Area',
            tableName: 'Areas',
            timestamps: true
        }
    );

    return Area;
};
