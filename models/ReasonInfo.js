const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const CheckInfo = require('./CheckInfo'); // 確保引入了 CheckInfo 模型

// 定義 ReasonInfo 模型
const ReasonInfo = sequelize.define('ReasonInfo', {
    reason_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // 主鍵，自動增長
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false // 描述，不允許為空
    },
    checkitem_id: {  // 外鍵指向 CheckInfo
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'check_info',  // 這裡要用表名，指向 check_info 表的 checkitem_id
            key: 'checkitem_id'
        }
    }
}, {
    tableName: 'reason_info' // 指定表名
});

// 設置模型關係
ReasonInfo.belongsTo(CheckInfo, { foreignKey: 'checkitem_id' }); // ReasonInfo 屬於 CheckInfo
CheckInfo.hasMany(ReasonInfo, { foreignKey: 'checkitem_id' }); // CheckInfo 有多個 ReasonInfo

module.exports = ReasonInfo;
