const sequelize = require('../config/database');
const Employee = require('./employee');
const Driver = require('./driver');
const Partner = require('./partner');
const Storage = require('./storage');
const Product = require('./product');
const Order = require('./order');
const Delivery = require('./delivery');
const Payment = require('./payment');
const User = require('./user');

const defineAssociations = () => {
    Employee.hasOne(Driver, { foreignKey: 'employee_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Driver.belongsTo(Employee, { foreignKey: 'employee_id' });

    Employee.hasMany(Storage, { foreignKey: 'manager_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Storage.belongsTo(Employee, { foreignKey: 'manager_id' });

    Partner.hasMany(Product, { foreignKey: 'partner_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
    Product.belongsTo(Partner, { foreignKey: 'partner_id' });

    Storage.hasMany(Product, { foreignKey: 'storage_id', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
    Product.belongsTo(Storage, { foreignKey: 'storage_id' });

    Product.hasMany(Order, { foreignKey: 'product_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
    Order.belongsTo(Product, { foreignKey: 'product_id' });

    Order.hasMany(Delivery, { foreignKey: 'order_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
    Delivery.belongsTo(Order, { foreignKey: 'order_id' });

    Order.hasOne(Payment, { foreignKey: 'order_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
    Payment.belongsTo(Order, { foreignKey: 'order_id' });

}


const syncDatabase = async () => {
    try {
        defineAssociations();
        await sequelize.sync({ force: false });
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

syncDatabase();

module.exports = { 
    Employee, 
    Driver,
    Partner,
    Storage,
    Product,
    Order,
    Delivery,
    Payment,
    User
   }; 
