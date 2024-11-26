const express = require('express');
const {
    getLimitOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');

const router = express.Router();
const checkAccess = require('../middleware/accessControl');
router.get('/',checkAccess('view'), getLimitOrders);

router.get('/:id',checkAccess('view'), getOrderById);

router.post('/',checkAccess('create'), createOrder);

router.put('/:id',checkAccess('update'), updateOrder);

router.delete('/:id',checkAccess('delete'), deleteOrder);

module.exports = router;
