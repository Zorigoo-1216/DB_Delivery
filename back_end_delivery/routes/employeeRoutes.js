const express = require('express');
const { getlimitEmployees, 
        getEmployeeById, 
        createEmployee, 
        updateEmployee, 
        deleteEmployee 
    } = require('../controllers/employeeController');

const checkAccess = require('../middleware/accessControl');

const router = express.Router();

router.get('/', checkAccess('view'),  getlimitEmployees);

router.get('/:id',checkAccess('view'),getEmployeeById);

router.post('/',checkAccess('create'),  createEmployee);

router.put('/:id', checkAccess('update'), updateEmployee);

router.delete('/:id',checkAccess('delete'),  deleteEmployee);

module.exports = router;