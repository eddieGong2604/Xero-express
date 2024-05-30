const {DataTypes, UUIDV4} = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const ChartOfAccounts = sequelize.define('Chart_of_accounts', {
    account_id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    account_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    account_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    account_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },
    account_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tax_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    account_status: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  });
  
  module.exports = ChartOfAccounts;
  