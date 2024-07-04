const {ModuleOp,OpInfo} = require('../models/index');

// 获取所有 ModuleOp 关系
exports.getAllModuleOps = async (req, res) => {
    try {
        const moduleOps = await ModuleOp.findAll();
        res.json(moduleOps);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 获取特定 ModuleOp
exports.getModuleOpById = async (req, res) => {
    try {
        const moduleOps = await ModuleOp.findAll({
            where: {
                module_id: req.params.id
            }
        });
        if (moduleOps.length > 0) {
            res.json(moduleOps);
        } else {
            res.status(404).send('Module-Op relationships not found for the specified ModuleId');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 创建新的 ModuleOp
exports.createModuleOp = async (req, res) => {
    try {
        const { module_id, op_id } = req.body;
        // 基本验证：确保 module_id 和 op_id 存在
        if (!module_id || !op_id) {
            return res.status(400).send("Missing module_id or op_id in the request.");
        }

        // 检查 Op_info 表中是否存在指定的 op_id
        const existingOp = await OpInfo.findOne({ where: { op_id } });
        if (!existingOp) {
            // 如果 op_id 不存在，返回 404 错误
            return res.status(404).send("The requested OP ID does not exist.");
        }

        // 检查 ModuleOp 表中是否已存在相同的 module_id 和 op_id 组合
        const existingModuleOp = await ModuleOp.findOne({ where: { module_id, op_id } });
        if (existingModuleOp) {
            // 如果关系已存在，返回 403 错误
            return res.status(403).send("The relationship between the given module and operation already exists.");
        }

        // 创建新的 ModuleOp 关系
        const moduleOp = await ModuleOp.create({ module_id, op_id });
        res.status(201).json(moduleOp);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};



// 更新 ModuleOp
exports.updateModuleOp = async (req, res) => {
    try {
        const { id } = req.params;
        const [ updated ] = await ModuleOp.update(req.body, { where: { id } });
        if (updated) {
            const updatedModuleOp = await ModuleOp.findByPk(id);
            res.status(200).json(updatedModuleOp);
        } else {
            res.status(404).send('Module-Op relationship not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 删除 ModuleOp
exports.deleteModuleOp = async (req, res) => {
    try {
        const { moduleId, opId } = req.params;  // 从URL参数中获取module_id和op_id
        const deleted = await ModuleOp.destroy({
            where: {
                module_id: moduleId,  // 确保这里的字段名与数据库模型中的对应
                op_id: opId           // 同上
            }
        });
        if (deleted) {
            res.status(204).send("Module-Op relationship deleted");
        } else {
            res.status(404).send("Module-Op relationship not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
