const { OpInfo } = require('../models/index'); 
exports.getAllOps = async (req, res) => {
    try {
        const Ops = await OpInfo.findAll();
        res.json(Ops);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getOpById = async (req, res) => {
    try {
        const Op = await OpInfo.findByPk(req.params.id);
        if (Op) {
            res.json(Op);
        } else {
            res.status(404).send('Op not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createOp = async (req, res) => {
    try {
        // 获取 URL 中的 ID
        const opId = req.params.id;

        // 创建新记录，这里假设你的模型接受外部 ID
        const Op = await OpInfo.create({
            op_id: opId,
            op_name:"user",
            ...req.body  // 其他从请求体中获取的数据
        });

        res.status(201).json(Op);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateOp = async (req, res) => {
    try {
        const result = await OpInfo.update(req.body, {
            where: { Op_id: req.params.id }
        });
        if (result[0] === 1) {
            res.send('Op updated successfully');
        } else {
            res.status(404).send('Op not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteOp = async (req, res) => {
    try {
        const result = await OpInfo.destroy({
            where: { Op_id: req.params.id }
        });
        if (result === 1) {
            res.send('Op deleted successfully');
        } else {
            res.status(404).send('Op not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
