const {DataTypes, UUIDV4} = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const Assets = sequelize.define('Assets', {
    entity_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    asset_id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    asset_number: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    purchase_price: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    disposal_price: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true
    },
    asset_status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    depreciation_calculation_method: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    depreciation_method: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    average_method: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    depreciation_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    effective_life_years: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: true
    },
    current_capital_gain: {
      type: DataTypes.NUMERIC(18, 2),
      allowNull: true
    },
    current_capital_lost: {
      type: DataTypes.NUMERIC(18, 2),
      allowNull: true
    },
    depreciation_start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cost_limits: {
      type: DataTypes.NUMERIC(18, 2),
      allowNull: true
    },
    asset_residual_value: {
      type: DataTypes.NUMERIC(18, 2),
      allowNull: true
    },
    prior_accum_depreciation_amount: {
      type: DataTypes.NUMERIC(18, 2),
      allowNull: true
    },
    current_accum_depreciation_amount: {
      type: DataTypes.NUMERIC(18, 2),
      allowNull: true
    }
  });
  
  module.exports = Assets;
  