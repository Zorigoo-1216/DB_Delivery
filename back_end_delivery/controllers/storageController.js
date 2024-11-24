const Storage = require('../models/storage');


async function getLimitStorages(req, res) {
    try {
        const limitStorages = await Storage.findAll({
            limit: 100,
            order: [['id', 'DESC']]
        });
        res.status(200).json(limitStorages);
        console.log(limitStorages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching storages' });
        console.error('Error fetching storages:', error.message);
    }
}

async function getStorageById(req, res) {
    try {
        const storage = await Storage.findByPk(req.params.id);
        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }
        res.status(200).json(storage);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching storage' });
        console.error('Error fetching storage:', error.message);
    }
}

async function createStorage(req, res) {
    try {
        const newStorage = await Storage.create(req.body);
        res.status(201).json(newStorage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating storage' });
        console.error('Error creating storage:', error.message);
    }
}

async function updateStorage(req, res) {
    try {
        const storage = await Storage.findByPk(req.params.id);
        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }
        await storage.update(req.body);
        res.status(200).json(storage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating storage' });
        console.error('Error updating storage:', error.message);
    }
}

async function deleteStorage(req, res) {
    try {
        const storage = await Storage.findByPk(req.params.id);
        if (!storage) {
            return res.status(404).json({ message: 'Storage not found' });
        }
        await storage.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting storage' });
        console.error('Error deleting storage:', error.message);
    }
}

module.exports = {getLimitStorages, getStorageById, createStorage, updateStorage, deleteStorage};