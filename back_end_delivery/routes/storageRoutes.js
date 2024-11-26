const express = require('express');
const {
    getLimitStorages,
    getStorageById,
    createStorage,
    updateStorage,
    deleteStorage,
} = require('../controllers/storageController');

const router = express.Router();
const checkAccess = require('../middleware/accessControl');
router.get('/',checkAccess('view'), getLimitStorages);

router.get('/:id',checkAccess('view'), getStorageById);

router.post('/',checkAccess('create'), createStorage);

router.put('/:id',checkAccess('update'), updateStorage);

router.delete('/:id',checkAccess('delete'), deleteStorage);

module.exports = router;


