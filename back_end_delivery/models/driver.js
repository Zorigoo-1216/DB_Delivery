const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Driver = sequelize.define(
    'Driver',
    {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull : false,
            primaryKey: true,
            references: {
                model: 'employee', 
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        transportation_type: {
            type: DataTypes.STRING(10), 
            allowNull: false, 
            validate: {
                isIn: {
                    args: [['CAR', 'BIKE', 'MOTORCYCLE']], 
                    msg: 'Transportation type must be one of: CAR, BIKE, MOTORCYCLE',
                },
            },
        },
        delivery_area: {
            type: DataTypes.STRING(255), 
            allowNull: true,
        },
    },
    {
        tableName: 'driver', 
        timestamps: false, 
    }
);

module.exports = Driver;
