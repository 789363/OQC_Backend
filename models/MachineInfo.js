const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const MachineInfo = sequelize.define('MachineInfo', {
  machine_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  machine_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'machine_info'
});

module.exports = MachineInfo;
