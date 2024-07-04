const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const ModuleOp = sequelize.define('ModuleOp', {
  module_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ModuleInfo', 
      key: 'module_id'
    }
  },
  op_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'OpInfo',  
      key: 'op_id'
    }
  }
}, {
  tableName: 'module_op'
});

module.exports = ModuleOp;
