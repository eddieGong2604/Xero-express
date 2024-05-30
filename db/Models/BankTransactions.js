const {DataTypes, UUIDV4} = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const BankTransactions = sequelize.define('Bank_Transactions', {
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    transaction_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    transaction_status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    contact_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contact_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    transaction_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    bank_account_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    account_code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    bank_account_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    transaction_currency: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    currency_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    transaction_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    item_ID: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    item_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    item_quantity: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: true
    },
    item_unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    sub_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    total_tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  });
  
  module.exports = BankTransactions;
  