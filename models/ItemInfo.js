const { DataTypes } = require('sequelize');
const sequelize = require('./database');  // 更新这里的路径

const ItemInfo = sequelize.define('ItemInfo', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  USL: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  CL: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  LSL: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'item_info'
});

module.exports = ItemInfo;
