const express = require('express');
const {
    getLimitPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} = require('../controllers/paymentController');

const router = express.Router();

router.get('/', getLimitPayments);

router.get('/:id', getPaymentById);
router.post('/', createPayment);

router.put('/:id', updatePayment);

router.delete('/:id', deletePayment);

module.exports = router;