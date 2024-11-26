const express = require('express');
const {
    getLimitPartners,
    getPartnerById,
    createPartner,
    updatePartner,
    deletePartner
} = require('../controllers/partnerController');

const router = express.Router();
const checkAccess = require('../middleware/accessControl');
router.get('/',checkAccess('view'), getLimitPartners);

router.get('/:id',checkAccess('view'), getPartnerById);

router.post('/',checkAccess('create'), createPartner);

router.put('/:id',checkAccess('update'), updatePartner);

router.delete('/:id',checkAccess('delete'), deletePartner);

module.exports = router;
