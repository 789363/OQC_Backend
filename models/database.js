const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

require('dotenv').config();

const databaseConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.user, databaseConfig.password, {
  host: databaseConfig.host,
  port: databaseConfig.port,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: databaseConfig.host,
    port: databaseConfig.port,
    user: databaseConfig.user,
    password: databaseConfig.password
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseConfig.database}`);
  await connection.end();
}

async function checkAndCreateDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database tables created/updated.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.log( error)
    if (error.name === 'SequelizeConnectionError') {

      await ensureDatabaseExists();
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Database tables created/updated after reconnection.');
    }
  }
}

checkAndCreateDatabase();

module.exports = sequelize;
