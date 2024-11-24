const Payment = require('../models/payment');


async function getLimitPayments(req, res) {
    try {
        const limitPayments = await Payment.findAll({
            limit: 10,
            order: [['id', 'DESC']],
            //include: [{ model: Order, include: [{ model: Product }] }]
        });
        res.status(200).json(limitPayments);
        console.log(limitPayments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving limit payments' });
    }
}
async function getPaymentById(req, res) {
    try {
        const payment = await Payment.findByPk(req.params.id, {
            //include: [{ model: Order, include: [{ model: Product }] }]
        });
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving payment' });
    }
}
async function createPayment(req, res) {
    try {
        const newPayment = await Payment.create(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating payment' });
    }
}

async function updatePayment(req, res) {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        await payment.update(req.body);
        res.status(200).json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating payment' });
    }
}

async function deletePayment(req, res) {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        await payment.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting payment' });
    }
}

module.exports = { getLimitPayments, getPaymentById, createPayment, updatePayment, deletePayment };