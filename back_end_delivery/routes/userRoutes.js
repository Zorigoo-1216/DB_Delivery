const express = require('express');
const {
    getUserById,
    createUser, 
    updateUser, 
    deleteUser, 
    login
} = require('../controllers/userController');

const router = express.Router();

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.post('/login', login);

module.exports = router;
