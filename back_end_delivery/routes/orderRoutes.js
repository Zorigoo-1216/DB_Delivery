const express = require('express');
const {
    getLimitOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

router.get('/', getLimitOrders);

router.get('/:id', getOrderById);

router.post('/', createOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

module.exports = router;
