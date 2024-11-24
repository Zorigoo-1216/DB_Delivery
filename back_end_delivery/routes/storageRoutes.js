const express = require('express');
const {
    getLimitStorages,
    getStorageById,
    createStorage,
    updateStorage,
    deleteStorage,
} = require('../controllers/storageController');

const router = express.Router();

router.get('/', getLimitStorages);

router.get('/:id', getStorageById);

router.post('/', createStorage);

router.put('/:id', updateStorage);

router.delete('/:id', deleteStorage);

module.exports = router;


