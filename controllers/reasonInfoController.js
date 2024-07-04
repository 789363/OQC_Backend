const ReasonInfo = require('../models/ReasonInfo');

exports.getAllReasons = async (req, res) => {
    try {
        const reasons = await ReasonInfo.findAll();
        res.json(reasons);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getReasonById = async (req, res) => {
    try {
        const { id } = req.params; 
        const reasons = await ReasonInfo.findAll({ where: { checkitem_id: id } }); 
        if (reasons.length > 0) {
            res.json(reasons);
        } else {
            res.status(404).send('Reasons not found for this check item');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createReason = async (req, res) => {
    try {
        const { description, checkitem_id } = req.body;
        const newReason = await ReasonInfo.create({ description, checkitem_id });
        res.status(201).json(newReason);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
exports.updateReason = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const [updated] = await ReasonInfo.update({ description }, { where: { reason_id: id } });
        if (updated) {
            const updatedReason = await ReasonInfo.findByPk(id);
            res.json(updatedReason);
        } else {
            res.status(404).send('Reason not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteReason = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ReasonInfo.destroy({ where: { reason_id: id } });
        if (deleted) {
            res.status(204).send("Reason deleted");
        } else {
            res.status(404).send("Reason not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
