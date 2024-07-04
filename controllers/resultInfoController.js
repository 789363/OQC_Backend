const ResultInfo = require('../models/ResultInfo');

exports.getAllResults = async (req, res) => {
    try {
        const results = await ResultInfo.findAll();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getResultById = async (req, res) => {
    try {
        const result = await ResultInfo.findByPk(req.params.id);
        if (result) {
            res.json(result);
        } else {
            res.status(404).send('Result not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createResult = async (req, res) => {
    try {
        const result = await ResultInfo.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateResult = async (req, res) => {
    try {
        const updated = await ResultInfo.update(req.body, {
            where: { result_id: req.params.id }
        });
        if (updated[0] === 1) {
            res.send('Result updated successfully');
        } else {
            res.status(404).send('Result not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteResult = async (req, res) => {
    try {
        const deleted = await ResultInfo.destroy({
            where: { result_id: req.params.id }
        });
        if (deleted === 1) {
            res.send('Result deleted successfully');
        } else {
            res.status(404).send('Result not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
