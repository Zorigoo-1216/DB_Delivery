const express = require('express');
const {
    getLimitPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} = require('../controllers/paymentController');

const router = express.Router();
const checkAccess = require('../middleware/accessControl');
router.get('/',checkAccess('view'), getLimitPayments);

router.get('/:id',checkAccess('view'), getPaymentById);
router.post('/',checkAccess('create'), createPayment);

router.put('/:id',checkAccess('update'), updatePayment);

router.delete('/:id',checkAccess('delete'), deletePayment);

module.exports = router;