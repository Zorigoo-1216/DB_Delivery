const express = require('express');
const {
    getLimitDeliveries,
    getDeliveryById,
    createDelivery,
    updateDelivery,
    deleteDelivery
} = require('../controllers/deliveryController');
const router = express.Router();

router.get('/',checkAccess('view'), getLimitDeliveries);

router.get('/:id',checkAccess('view'), getDeliveryById);

router.post('/',checkAccess('create'), createDelivery);

router.put('/:id',checkAccess('update'), updateDelivery);

router.delete('/:id',checkAccess('delete'), deleteDelivery);

module.exports = router;
