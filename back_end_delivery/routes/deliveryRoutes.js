const express = require('express');
const {
    getLimitDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery
} = require('../controllers/deliveryController');
const router = express.Router();

router.get('/', getLimitDeliveries);

router.get('/:id', getDeliveryById);

router.post('/', createDelivery);

router.put('/:id', updateDelivery);

router.delete('/:id', deleteDelivery);

module.exports = router;
