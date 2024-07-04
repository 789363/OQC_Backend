const ModuleInfo = require('./ModuleInfo');
const OpInfo = require('./OpInfo');
const ModuleOp = require('./ModuleOp');
const ItemInfo = require('./ItemInfo');  // 假设这个模型已经定义

// 设置多对多关系
ModuleInfo.belongsToMany(OpInfo, { through: ModuleOp, foreignKey: 'module_id', otherKey: 'op_id' });
OpInfo.belongsToMany(ModuleInfo, { through: ModuleOp, foreignKey: 'op_id', otherKey: 'module_id' });

// 设置一对多关系
ModuleInfo.hasMany(ItemInfo, { foreignKey: 'module_id' });
ItemInfo.belongsTo(ModuleInfo, { foreignKey: 'module_id' });

module.exports = {
  ModuleInfo,
  OpInfo,
  ItemInfo,
  ModuleOp
};
