const {DataTypes, UUIDV4} = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const SystemAccountStandard = sequelize.define('System_Account_Standard', {
    system_account_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    system_account_class: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    system_account_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    system_account_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
  
  module.exports = SystemAccountStandard;
  