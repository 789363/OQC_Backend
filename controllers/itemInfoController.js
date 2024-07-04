const {ItemInfo} = require('../models/index');

exports.getAllItems = async (req, res) => {
    try {
        const items = await ItemInfo.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getItemsById = async (req, res) => {
    try {
        const moduleId = req.params.id;
        const items = await ItemInfo.findAll({
            where: { module_id: moduleId }
        });
        if (items) {
            res.json(items);
        } else {
            res.status(404).send('Items not found for this module');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createItem = async (req, res) => {
    try {
        const item = await ItemInfo.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateItem = async (req, res) => {
    console.log(req.body)
    try {
        const result = await ItemInfo.update(req.body, {
            where: { item_id: req.params.id }
        });
        if (result[0] === 1) {
            res.send('Item updated successfully');
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const result = await ItemInfo.destroy({
            where: { item_id: req.params.id }
        });
        if (result === 1) {
            res.send('Item deleted successfully');
        } else {
            res.status(404).send('Item not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
