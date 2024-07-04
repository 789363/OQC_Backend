// 引入模型
const CheckItems = require('../models/CheckInfo');
const ReasonInfo = require('../models/ReasonInfo');  // 引入 ReasonInfo 模型

// 獲取所有檢查項目
exports.getAllCheckItems = async (req, res) => {
    try {
        // 使用 findAll 方法獲取所有檢查項目
        const checkItems = await CheckItems.findAll();
        res.json(checkItems);
    } catch (error) {
        // 處理錯誤，返回 500 狀態碼和錯誤信息
        res.status(500).send(error.message);
    }
};

// 根據 id 獲取特定檢查項目
exports.getCheckItemById = async (req, res) => {
    console.log(req.params);
    try {
        const { id } = req.params;  // 從請求參數中提取 id
        // 查找特定檢查項目，並包括關聯的 ReasonInfo
        const checkItems = await CheckItems.findAll({
            where: { module_id: id },
            include: [{
                model: ReasonInfo,
                attributes: ['description']  // 僅獲取原因的描述
            }]
        });

        if (checkItems.length > 0) {
            // 格式化響應數據
            const formattedCheckItems = checkItems.map(checkItem => ({
                id: checkItem.checkitem_id,
                text: checkItem.description,
                status: "NA",  // 默認值
                reasons: checkItem.ReasonInfos.map(reason => reason.description),
                selectedReason: "NA",  // 默認值
                disabledReason: true,  // 默認值
                checked: false  // 默認值
            }));
            res.json(formattedCheckItems);
        } else {
            res.status(404).send('CheckItems not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 創建新的檢查項目
exports.createCheckItem = async (req, res) => {
    try {
        const { module_id, checkitem_name, description, is_critical } = req.body;
        console.log(req.body);
        // 使用 create 方法創建新檢查項目
        const newCheckItem = await CheckItems.create({ module_id, checkitem_name, description, is_critical });
        res.status(201).json(newCheckItem);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// 更新檢查項目
exports.updateCheckItem = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    try {
        const { id } = req.params;
        const { description, status, reasons, selectedReason } = req.body;
        
        // 構建更新數據
        const updateData = {
            description: description,
            status: status,
            reasons: JSON.stringify(reasons),  // 將數組轉為 JSON 字串
            selectedReason: selectedReason
        };

        // 執行更新操作
        const updated = await CheckItems.update(updateData, {
            where: { checkitem_id: id }
        });

        if (updated[0]) {
            const updatedCheckItem = await CheckItems.findByPk(id);
            res.json(updatedCheckItem);
            console.log('Success');
        } else {
            res.status(404).send('CheckItem not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 刪除檢查項目
exports.deleteCheckItem = async (req, res) => {
    const { id } = req.params;
    try {
        // 首先刪除所有相關的原因
        await ReasonInfo.destroy({
            where: { checkitem_id: id }
        });

        // 然後刪除檢查項目
        const deleted = await CheckItems.destroy({
            where: { checkitem_id: id }
        });

        if (deleted) {
            res.status(204).send("CheckItem and related reasons deleted");
        } else {
            res.status(404).send("CheckItem not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
