const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define(
    'Payment',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'order',
                key: 'id',
            },
            allowNull: false,
            onDelete: 'NO ACTION', // Match SQL constraint
            onUpdate: 'CASCADE',
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: true,
            // validate: {
            //     isIn: [['card', 'paypal', 'apple pay']],
            // },
        },
        status: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                isIn: [['SUCCESS', 'REFUNDED']],
                msg: 'Status must be one of SUCCESS or REFUNDED',
            },
        }
    },
    {
        tableName: 'payment',
        timestamps: false, 
    }
);

module.exports = Payment;
