const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        storage_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'storage',
                key: 'id',
            },
            onDelete: 'SET NULL', // Match SQL constraint
            onUpdate: 'CASCADE', // Match SQL constraint
        },
        partner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'partner',
                key: 'id',
            },
            onDelete: 'NO ACTION', // Match SQL constraint
            onUpdate: 'CASCADE', // Match SQL constraint
        },
        name : {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        price : {
            type:DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: 'product',
        timestamps: false, 
    }
);

module.exports = Product;
