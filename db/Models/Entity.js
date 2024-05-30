const {DataTypes, UUIDV4} = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL)

const Entity = sequelize.define('Entity', {
    entity_id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  });
  
  module.exports = Entity;
  