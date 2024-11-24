const express = require('express');
const {
    getLimitPartners,
    getPartnerById,
    createPartner,
    updatePartner,
    deletePartner
} = require('../controllers/partnerController');

const router = express.Router();
router.get('/', getLimitPartners);

router.get('/:id', getPartnerById);

router.post('/', createPartner);

router.put('/:id', updatePartner);

router.delete('/:id', deletePartner);

module.exports = router;
