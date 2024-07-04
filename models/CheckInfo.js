const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const ModuleInfo = require('./ModuleInfo'); // 引入ModuleInfo模型

const CheckItems = sequelize.define('CheckItems', {
  checkitem_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  module_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'module_info', // 确保是数据库中的表名
      key: 'module_id'
    }
  },
  description: {
    type: DataTypes.STRING
  },

}, {
  tableName: 'check_info'
});

// 定义模型之间的关系
CheckItems.belongsTo(ModuleInfo, { foreignKey: 'module_id' });
ModuleInfo.hasMany(CheckItems, { foreignKey: 'module_id' });

module.exports = CheckItems;
