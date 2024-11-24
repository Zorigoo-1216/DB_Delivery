const Driver = require('../models/driver');


async function getLimitDrivers(req, res) {
    try {
        const limitDrivers = await Driver.findAll({
            limit: 10,
            order: [['employee_id', 'DESC']],
        });
        res.status(200).json(limitDrivers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drivers' });
        console.error('Error fetching drivers:', error.message);
    }
}

async function getDriverById(req, res) {
    try {
        const {id} = req.params;
        const driver = await Driver.findByPk(id);
        if (!driver)
            return res.status(404).json({ message: 'Driver not found' });
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching driver' });
        console.error('Error fetching driver:', error.message);
    }
}

async function createDriver(req, res) {
    try {
        const newDriver = await Driver.create(req.body);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ message: 'Error creating driver' });
        console.error('Error creating driver:', error.message);
    }
}

async function updateDriver(req, res) {
    try {
        const driver = await Driver.findByPk(req.params.id);
        if (!driver)
            return res.status(404).json({ message: 'Driver not found' });
        const updatedDriver =  await driver.update(req.body);
        res.status(200).json(updatedDriver);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating driver' });
        console.error('Error updating driver:', error.message);
    }
}

async function deleteDriver(req, res) {
    try {
        const driver = await Driver.findByPk(req.params.id);
        if (!driver)
            return res.status(404).json({ message: 'Driver not found' });
        await driver.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting driver' });
        console.error('Error deleting driver:', error.message);
    }
}

module.exports = { getLimitDrivers, getDriverById, createDriver, updateDriver, deleteDriver };