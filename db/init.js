const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const createDB = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS Customer (
      customer_id UUID , 
      name VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS Entity (
      entity_id UUID ,
      name VARCHAR(255) NOT NULL, 
      customer_id UUID 
    );
    
    CREATE TABLE IF NOT EXISTS Assets (
      entity_id UUID ,
      asset_id UUID ,
      name VARCHAR(255) NOT NULL,
      asset_number VARCHAR(255), 
      purchase_date TIMESTAMPTZ, 
      purchase_price NUMERIC(18, 2),
      disposal_price NUMERIC(18, 2),
      asset_status VARCHAR(50),
      depreciation_calculation_method VARCHAR(50),
      depreciation_method VARCHAR(50),
      average_method VARCHAR(50),
      depreciation_rate DECIMAL(10,2), 
      effective_life_years NUMERIC(10,2),
      current_capital_gain NUMERIC(18,2), 
      current_capital_lost NUMERIC(18,2), 
      depreciation_start_date TIMESTAMPTZ, 
      cost_limits NUMERIC(18,2), 
      asset_residual_value NUMERIC(18,2), 
      prior_accum_depreciation_amount NUMERIC(18,2), 
      current_accum_depreciation_amount NUMERIC(18,2)
    ); 
    
    CREATE TABLE IF NOT EXISTS System_Account_Standard (
        system_account_code VARCHAR(255) ,
        system_account_class VARCHAR(50), 
        system_account_name VARCHAR(50), 
        system_account_description TEXT
    );
    
    CREATE TABLE IF NOT EXISTS Entity_Accounts_Map (
      entity_id UUID ,
      entity_account_code VARCHAR(50),
      system_account_code VARCHAR(255) 

    );
    
      CREATE TABLE IF NOT EXISTS Account_Types (
        entity_id UUID ,
        account_type VARCHAR(50) ,
        account_class_type VARCHAR(50) 
      );

      CREATE TABLE IF NOT EXISTS Chart_of_accounts (
        account_id UUID ,
        entity_id UUID  ,
        account_type VARCHAR(50) ,
        account_name VARCHAR(255),
        account_code VARCHAR(255) UNIQUE, 
        account_description TEXT,
        tax_type VARCHAR(50),
        account_status VARCHAR(50)
    );

    CREATE TABLE IF NOT EXISTS Bank_Transactions (
      entity_id UUID ,
      transaction_id VARCHAR(255) ,
      transaction_status VARCHAR(50), 
      contact_id VARCHAR(255), 
      contact_name VARCHAR(255), 
      transaction_date TIMESTAMPTZ, 
    
      bank_account_id UUID ,
      bank_account_code VARCHAR(50) NOT NULL,
      bank_account_name VARCHAR(255) NOT NULL,
    
      transaction_currency VARCHAR(50), 
      currency_rate DECIMAL(10,2),
      transaction_type VARCHAR(50), 
    
    
      item_ID VARCHAR(255),
      item_description TEXT, 
      item_quantity NUMERIC(10,2),
      item_unit_price DECIMAL(10,2),
      sub_total DECIMAL(10,2),
      total_tax DECIMAL(10,2),
      total_amount DECIMAL(10,2)
    );
    `);

    console.log("Creating tables successfully.");
  } catch (error) {
    console.error("Error creating tables", error);
  }
};



module.exports = {
  query: (text, params) => pool.query(text, params),
  createDB
};






