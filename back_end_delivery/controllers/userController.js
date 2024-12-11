const sequelize = require('../config/database');

// Get User by ID (vulnerable to SQL injection)
async function getUserById(req, res) {
    try {
        // Raw SQL query
        const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
        console.log('Executing query:', query);
        const [results] = await sequelize.query(query);

        if (!results || results.length === 0) return res.status(404).send('User not found');
        res.status(200).send(results[0]);
    } catch (error) {
        console.error('Error getting user:', error.message);
        return res.status(500).send('Server error');
    }
}

// Login (vulnerable to SQL injection)
async function login(req, res) {
    const { username, pass } = req.body;

    try {
        // Raw SQL query
        const query = `SELECT * FROM users WHERE username = '${username}' AND pass = '${pass}'`;
        console.log('Executing query:', query);
        const [results] = await sequelize.query(query);

        if (!results || results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user: results[0] });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

// Create User (vulnerable to SQL injection)
async function createUser(req, res) {
    const { username, pass } = req.body;

    try {
        // Raw SQL query
        const query = `INSERT INTO users (username, pass) VALUES ('${username}', '${pass}')`;
        console.log('Executing query:', query);
        const [results] = await sequelize.query(query);

        res.status(201).json({ message: 'User created', userId: results.insertId });
    } catch (error) {
        console.error('Error creating user:', error.message);
        return res.status(500).send('Server error');
    }
}

// Update User (vulnerable to SQL injection)
async function updateUser(req, res) {
    const { username, pass } = req.body;

    try {
        // Raw SQL query
        const query = `UPDATE users SET username = '${username}', pass = '${pass}' WHERE id = ${req.params.id}`;
        console.log('Executing query:', query);
        const [results] = await sequelize.query(query);

        if (results.affectedRows === 0) return res.status(404).send('User not found');
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        console.error('Error updating user:', error.message);
        return res.status(500).send('Server error');
    }
}

// Delete User (vulnerable to SQL injection)
async function deleteUser(req, res) {
    try {
        // Raw SQL query
        const query = `DELETE FROM users WHERE id = ${req.params.id}`;
        console.log('Executing query:', query);
        const [results] = await sequelize.query(query);

        if (results.affectedRows === 0) return res.status(404).send('User not found');
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error.message);
        return res.status(500).send('Server error');
    }
}

module.exports = { getUserById, createUser, updateUser, deleteUser, login };