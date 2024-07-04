const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const ModuleInfo = sequelize.define('ModuleInfo', {
  module_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  module_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'module_info'
});

module.exports = ModuleInfo;
