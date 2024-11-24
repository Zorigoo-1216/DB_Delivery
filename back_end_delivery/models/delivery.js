const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Delivery = sequelize.define('Delivery', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    employee_id: {
        type: DataTypes.INTEGER, 
        references: { 
            model: 'employee', 
            key: 'id' },
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
    },
    order_id: { 
        type: DataTypes.INTEGER, 
        references: { 
            model: 'order', 
            key: 'id' },

        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',},
       

    delivered_time:{
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,    
},
    
},
{
    tableName: 'delivery', // Match table name in SQL
    timestamps: false, // Disable Sequelize's auto-added `createdAt` and `updatedAt`

});

module.exports = Delivery;
