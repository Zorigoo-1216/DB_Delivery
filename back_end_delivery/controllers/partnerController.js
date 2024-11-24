const Partner = require('../models/partner');


async function getLimitPartners(req, res) {
    try {
        const limitPartners = await Partner.findAll({
            limit: 10,
            order: [['id', 'DESC']]
        });
        res.status(200).json(limitPartners);
        console.log(limitPartners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching partners' });
        console.error(error);
    }
}

async function getPartnerById(req, res) {
    try {
        const partner = await Partner.findByPk(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching partner' });
        console.error(error);
    }
}

async function createPartner(req, res) {
    try {
        const newPartner = await Partner.create(req.body);
        res.status(201).json(newPartner);
    } catch (error) {
        res.status(400).json({ message: 'Invalid partner data' });
        console.error(error);
    }
}

async function updatePartner(req, res) {
    try {
        const partner = await Partner.findByPk(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        await partner.update(req.body);
        res.status(200).json(partner);
    } catch (error) {
        res.status(400).json({ message: 'Invalid partner data' });
        console.error(error);
    }
}

async function deletePartner(req, res) {
    try {
        const partner = await Partner.findByPk(req.params.id);
        if (!partner) {
            return res.status(404).json({ message: 'Partner not found' });
        }
        await partner.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting partner' });
        console.error(error);
    }
}

module.exports = {getLimitPartners, getPartnerById, createPartner, updatePartner, deletePartner};
