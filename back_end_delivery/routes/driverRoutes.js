const express = require('express');
const {
    getLimitDrivers,
    getDriverById,
    createDriver,
    updateDriver,
    deleteDriver
} = require('../controllers/driverController');
const router = express.Router();

router.get('/',checkAccess('view'), getLimitDrivers);

router.get('/:id',checkAccess('view'), getDriverById);

router.post('/',checkAccess('create'), createDriver);

router.put('/:id',checkAccess('update'), updateDriver);

router.delete('/:id',checkAccess('delete'), deleteDriver);

module.exports = router;
