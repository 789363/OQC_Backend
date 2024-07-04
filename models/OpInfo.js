const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 

const OpInfo = sequelize.define('OpInfo', {
  op_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  op_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'op_info'
});

module.exports = OpInfo;
