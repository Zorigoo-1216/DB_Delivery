const express = require('express');
const {
    getLimitDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
} = require('../controllers/driverController');
const router = express.Router();

router.get('/', getLimitDrivers);

router.get('/:id', getDriverById);

router.post('/', createDriver);

router.put('/:id', updateDriver);

router.delete('/:id', deleteDriver);

module.exports = router;
