const LineInfo = require('../models/LineInfo');

exports.getAllLines = async (req, res) => {
    try {
        const lines = await LineInfo.findAll();
        res.json(lines);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getLineById = async (req, res) => {
    try {
        const line = await LineInfo.findByPk(req.params.id);
        if (line) {
            res.json(line);
        } else {
            res.status(404).send('Line not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createLine = async (req, res) => {
    try {
        const line = await LineInfo.create(req.body);
        res.status(201).json(line);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateLine = async (req, res) => {
    try {
        const result = await LineInfo.update(req.body, {
            where: { line_id: req.params.id }
        });
        if (result[0] === 1) {
            res.send('Line updated successfully');
        } else {
            res.status(404).send('Line not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteLine = async (req, res) => {
    try {
        const result = await LineInfo.destroy({
            where: { line_id: req.params.id }
        });
        if (result === 1) {
            res.send('Line deleted successfully');
        } else {
            res.status(404).send('Line not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
