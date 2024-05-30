const {DataTypes, UUIDV4} = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const AccountTypes = sequelize.define('Account_Types', {
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    account_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    account_class_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  });
  
  module.exports = AccountTypes;
  