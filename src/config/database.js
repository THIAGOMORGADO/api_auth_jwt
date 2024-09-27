const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',

})


sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to on database...")
  })
  .catch((err) => {
    console.log(err, "Not connected is database connection")
  })
module.exports = sequelize;