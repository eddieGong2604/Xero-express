const {DataTypes, UUIDV4} = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const EntityAccountsMap = sequelize.define('Entity_Accounts_Map', {
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    entity_account_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    system_account_code: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  });
  
  module.exports = EntityAccountsMap;
  