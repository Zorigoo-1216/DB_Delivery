const Employee = require('../models/employee');
async function getlimitEmployees(req, res) {
    try {
        const limitEmployees = await Employee.findAll({
            limit: 100,
            order: [['id', 'DESC']],
        });
        res.status(200).json(limitEmployees);
    } catch (error) {
        console.error('Error fetching employees:', error.message);
        res.status(500).json({ message: 'Error fetching employees' });
    }
}


async function getEmployeeById(req, res) {
    try {
        const { id } = req.params; // Extracting id from req.params
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // If an update request is detected (e.g., PUT request), handle it separately
        // const { Last_name, First_name, position } = req.body;
        // if (Last_name || First_name || position) {
        //     const updatedEmployee = await employee.update({
        //         Last_name,
        //         First_name,
        //         position,
        //     });
        //     return res.status(200).json(updatedEmployee);
        // }

        // If no update data, return the employee details
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error.message);
        res.status(500).json({ message: 'Error fetching employee' });
    }
}

// Create a new employee
async function createEmployee(req, res) {
    try {
    
        const newEmployee = await Employee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error.message);
        res.status(400).json({ message: 'Invalid request data' });
    }
}

// Update an existing employee
async function updateEmployee(req, res) {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const updatedEmployee = await employee.update(req.body);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee:', error.message);
        res.status(400).json({ message: 'Invalid request data' });
    }
}

// Delete an employee by ID
async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        await employee.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting employee:', error.message);
        res.status(500).json({ message: 'Error deleting employee' });
    }
}

module.exports = { getEmployeeById, createEmployee, updateEmployee, deleteEmployee, getlimitEmployees };
