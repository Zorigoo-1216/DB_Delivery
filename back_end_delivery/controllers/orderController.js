const Order = require('../models/order');


async function getLimitOrders(req, res) {
    try{
        const limitOrders = await Order.findAll({
            limit: 100,
            order: [['id', 'DESC']]
        });
        res.status(200).json(limitOrders);
        console.log(limitOrders);
    }
    catch(error){
        res.status(500).json({message: 'Error fetching orders'});
        console.error('Error fetching orders:', error.message);
    }
}

async function getOrderById(req, res) {
    try{
        const order = await Order.findByPk(req.params.id);
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        res.status(200).json(order);
    }
    catch(error){
        res.status(500).json({message: 'Error fetching order'});
        console.error('Error fetching order:', error.message);
    }
}

async function createOrder(req, res) {
    try{
        const newOrder = await Order.create(req.body);
        res.status(201).json(newOrder);
    }
    catch(error){
        res.status(400).json({message: 'Invalid order data'});
        console.error('Invalid order data:', error.message);
    }
}


async function updateOrder(req, res) {
    try{
        const order = await Order.findByPk(req.params.id);
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        await order.update(req.body);
        res.status(200).json(order);
    }
    catch(error){
        res.status(400).json({message: 'Invalid order data'});
        console.error('Invalid order data:', error.message);
    }
}

async function deleteOrder(req, res) {
    try{
        const order = await Order.findByPk(req.params.id);
        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        await order.destroy();
        res.status(204).send();
    }
    catch(error){
        res.status(500).json({message: 'Error deleting order'});
        console.error('Error deleting order:', error.message);
    }
}

module.exports = { getLimitOrders, getOrderById, createOrder, updateOrder, deleteOrder };