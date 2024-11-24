const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false, 
            validate: {
                isIn: {
                    args: [['SUCCESS', 'CANCELED', 'WAITING', 'ON DELIVERY']], 
                    msg: 'Status must be one of SUCCESS, CANCELED, WAITING, ON DELIVERY',
                },
            },
        },
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'product', 
                key: 'id',
            },
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        created_time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, 
        },
        address: {
            type: DataTypes.STRING(255), 
            allowNull: true, 
        },
    },
    {
        tableName: 'order',
        timestamps: false, 
    }
);

module.exports = Order;
