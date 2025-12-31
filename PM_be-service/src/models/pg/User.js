'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) { }
    }

    User.init(
        {
            fullName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: { isEmail: true }
            },
            address: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM('admin', 'user', 'staff'),
                defaultValue: 'user'
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true
            },

            totalLine: {
                type: DataTypes.JSON,
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
            },

            objectDetected: {
                type: DataTypes.JSON,
                defaultValue: {}
            },

            // ✔ Trường cần để biết sang ngày mới
            lastUpdateDate: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true
        }
    );

    return User;
};
