const express = require('express');
const {
    getLimitProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const router = express.Router();
const checkAccess = require('../middleware/accessControl');

router.get('/',checkAccess('view'), getLimitProducts);

router.get('/:id',checkAccess('view'), getProductById);

router.post('/',checkAccess('create'), createProduct);

router.put('/:id',checkAccess('update'), updateProduct);

router.delete('/:id',checkAccess('delete'), deleteProduct);

module.exports = router;
