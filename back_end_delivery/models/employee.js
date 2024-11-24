const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Last_name: { type: DataTypes.STRING, allowNull: false },
    First_name: { type: DataTypes.STRING, allowNull: false },
    sex: { type: DataTypes.CHAR, allowNull: false },
    position: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: { type: DataTypes.BIGINT, unique: true },
    date_of_brith: { type: DataTypes.DATE },
    passport: { type: DataTypes.STRING },
    home_address: { type: DataTypes.STRING },
    salary: { type: DataTypes.INTEGER },
},
{
    tableName : 'employee',
    timestamps: false,
   
}
);

module.exports = Employee;
