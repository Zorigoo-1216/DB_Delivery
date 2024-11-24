const express = require('express');
const { getlimitEmployees, 
        getEmployeeById, 
        createEmployee, 
        updateEmployee, 
        deleteEmployee 
    } = require('../controllers/employeeController');
//const checkAccess = require('../middleware/accessControl');

const router = express.Router();
//router.use(checkAccess(['view', 'create', 'update', 'delete']));
// Get all employees
router.get('/',  getlimitEmployees);

// Get an employee by ID
router.get('/:id',getEmployeeById);

// Create a new employee
router.post('/',  createEmployee);

// Update an employee
router.put('/:id', updateEmployee);

// Delete an employee
router.delete('/:id',  deleteEmployee);

module.exports = router;