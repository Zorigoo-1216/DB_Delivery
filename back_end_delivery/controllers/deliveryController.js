const Delivery = require('../models/delivery');


 
async function getLimitDeliveries (req, res) {
    try {
        const deliveries = await Delivery.findAll({
            limit: 100,
        });
        res.status(200).json(deliveries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching deliveries' });
    }
};

async function getDeliveryById(req, res) {
    try {
        const delivery = await Delivery.findByPk(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.status(200).json(delivery);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error fetching delivery' });
        console.error('Error fetching delivery:', error.message);
    }
}

async function createDelivery(req, res) {
    try {
        const newDelivery = await Delivery.create(req.body);
        res.status(201).json(newDelivery);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error creating delivery' });
        console.error('Error creating delivery:', error.message);
    }
}
async function updateDelivery(req, res) {
    try {
        const delivery = await Delivery.findByPk(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        await delivery.update(req.body);
        res.status(200).json(delivery);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error updating delivery' });
        console.error('Error updating delivery:', error.message);
    }
}
async function deleteDelivery(req, res) {
    try {
        const delivery = await Delivery.findByPk(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        await delivery.destroy();
        res.status(204).send();
    } 
    catch (error) {
        res.status(500).json({ message: 'Error deleting delivery' });
        console.error('Error deleting delivery:', error.message);
    }
}

module.exports = {getDeliveryById, createDelivery, updateDelivery, deleteDelivery, getLimitDeliveries};