const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Storage = sequelize.define(
    'Storage',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'id',
            },
            allowNull: true,
            onDelete : 'CASCADE', // Match SQL constraint
            onUpdate : 'CASCADE', // Match SQL constraint,

        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone : {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
        }
    },
    {
        tableName: 'storage',
        timestamps: false, 
    }
);

module.exports = Storage;
