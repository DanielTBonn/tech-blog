const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(
    process.env.DB_URL,
    {
      dialect: process.env.DB_DIALECT
    });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      port: 3306,
    }
  );
}

module.exports = sequelize;