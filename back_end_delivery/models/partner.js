const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partner = sequelize.define(
    'Partner',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone : {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
        },
        business_type: {
            type: DataTypes.STRING(255), // Match VARCHAR(255) in SQL
            allowNull: true, // Optional field based on SQL schema
        },
    },
    {
        tableName: 'partner',
        timestamps: false, 
    }
);

module.exports = Partner;
