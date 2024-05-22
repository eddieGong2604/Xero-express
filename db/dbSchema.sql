CREATE TABLE IF NOT EXISTS Customer (
      customer_id UUID PRIMARY KEY, 
      name VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS Entity (
      entity_id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL, 
      customer_id UUID REFERENCES Customer(customer_id)
    );
    
    CREATE TABLE IF NOT EXISTS Assets (
      entity_id UUID REFERENCES Entity(entity_id),
      asset_id UUID PRIMARY KEY,
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
        system_account_code VARCHAR(255) PRIMARY KEY,
        system_account_class VARCHAR(50), 
        system_account_name VARCHAR(50), 
        system_account_description TEXT
    );
    
    CREATE TABLE IF NOT EXISTS Entity_Accounts_Map (
      entity_id UUID PRIMARY KEY REFERENCES Entity(entity_id),
      entity_account_code VARCHAR(50),
      system_account_code VARCHAR(255) REFERENCES System_Account_Standard(system_account_code),
      UNIQUE(entity_id)
      );
    
      CREATE TABLE IF NOT EXISTS Account_Types (
        entity_id UUID REFERENCES Entity(entity_id),
        account_type VARCHAR(50) PRIMARY KEY,
        account_class_type VARCHAR(50) 
      );

      CREATE TABLE IF NOT EXISTS Chart_of_accounts (
        account_id UUID PRIMARY KEY,
        entity_id UUID UNIQUE REFERENCES Entity_Accounts_map(entity_id),
        account_type VARCHAR(50) REFERENCES Account_Types(account_type),
        account_name VARCHAR(255),
        account_code VARCHAR(255) UNIQUE, 
        account_description TEXT,
        tax_type VARCHAR(50),
        account_status VARCHAR(50)
    );

    CREATE TABLE IF NOT EXISTS Bank_Transactions (
      entity_id UUID REFERENCES Chart_of_accounts(entity_id),
      transaction_id VARCHAR(255) PRIMARY KEY,
      transaction_status VARCHAR(50), 
      contact_id VARCHAR(255), 
      contact_name VARCHAR(255), 
      transaction_date TIMESTAMPTZ, 
    
      bank_account_id UUID REFERENCES Chart_of_accounts(account_id) ,
      bank_account_code VARCHAR(50) NOT NULL,
      bank_account_name VARCHAR(255) NOT NULL,
    
      transaction_currency VARCHAR(50), 
      currency_rate DECIMAL(10,2),
      transaction_type VARCHAR(50), 
    
      account_code VARCHAR(255) REFERENCES Chart_of_accounts(account_code),
      item_ID VARCHAR(255),
      item_description TEXT, 
      item_quantity NUMERIC(10,2),
      item_unit_price DECIMAL(10,2),
      sub_total DECIMAL(10,2),
      total_tax DECIMAL(10,2),
      total_amount DECIMAL(10,2)
    );
DROP TABLE bank_transactions;

drop TABLE chart_of_accounts, assets;

drop TABLE account_types, entity_accounts_map;

drop TABLE system_account_standard, entity;

drop TABLE customer;

INSERT INTO
    Customer (customer_id, name)
VALUES (
        '6fa459ea-ee8a-3ca4-894e-db77e160355e',
        'Coca Cola'
    );

INSERT INTO
    Entity (entity_id, name, customer_id)
VALUES (
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        'Coke',
        '6fa459ea-ee8a-3ca4-894e-db77e160355e'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afb7',
        'Fanta',
        '6fa459ea-ee8a-3ca4-894e-db77e160355e'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afc8',
        'Sprite',
        '6fa459ea-ee8a-3ca4-894e-db77e160355e'
    );

INSERT INTO
    Assets (
        entity_id,
        asset_id,
        name,
        asset_number,
        purchase_date,
        purchase_price,
        disposal_price,
        asset_status,
        depreciation_calculation_method,
        depreciation_method,
        average_method,
        depreciation_rate,
        effective_life_years,
        current_capital_gain,
        current_capital_lost,
        depreciation_start_date,
        cost_limits,
        asset_residual_value,
        prior_accum_depreciation_amount,
        current_accum_depreciation_amount
    )
VALUES (
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        '123e4567-e89b-12d3-a456-426614174000',
        'Coke Asset',
        'CA123',
        '2022-01-01 00:00:00+00',
        100000.00,
        20000.00,
        'Active',
        'Straight Line',
        'SLM',
        'Average',
        10.00,
        10.0,
        5000.00,
        2000.00,
        '2022-01-01 00:00:00+00',
        15000.00,
        80000.00,
        20000.00,
        30000.00
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afb7',
        '123e4567-e89b-12d3-a456-426614174001',
        'Fanta Asset',
        'FA123',
        '2023-01-01 00:00:00+00',
        150000.00,
        30000.00,
        'Active',
        'Double Declining',
        'DDM',
        'Average',
        15.00,
        5.0,
        7000.00,
        2500.00,
        '2023-01-01 00:00:00+00',
        20000.00,
        120000.00,
        25000.00,
        35000.00
    );

INSERT INTO
    System_Account_Standard (
        system_account_code,
        system_account_class,
        system_account_name,
        system_account_description
    )
VALUES (
        'REV_SODA',
        'Revenue',
        'Soda Revenue',
        'Consolidated revenue from soda sales'
    ),
    (
        'REV_SYRUP',
        'Revenue',
        'Syrup Revenue',
        'Consolidated revenue from syrup sales'
    );

INSERT INTO
    Entity_Accounts_Map (
        entity_id,
        entity_account_code,
        system_account_code
    )
VALUES (
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        'COKE_BOTTLES',
        'REV_SODA'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        'COKE_SYRUP',
        'REV_SYRUP'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afb7',
        'FANTA_BOTTLES',
        'REV_SODA'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afb7',
        'FANTA_SYRUP',
        'REV_SYRUP'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afc8',
        'SPRITE_SMALL_CAN',
        'REV_SODA'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afc8',
        'SPRITE_LARGE_CAN',
        'REV_SODA'
    );

INSERT INTO
    Account_Types (
        entity_id,
        account_type,
        account_class_type
    )
VALUES (
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        'Revenue',
        'Income'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afb7',
        'Revenue',
        'Income'
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afc8',
        'Revenue',
        'Income'
    );

INSERT INTO
    Chart_of_accounts (
        account_id,
        entity_id,
        account_type,
        account_name,
        account_code,
        account_description,
        tax_type,
        account_status
    )
VALUES (
        '4fa85f64-5717-4562-b3fc-2c963f66afa6',
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        'Revenue',
        'Coke Bottles Revenue',
        'COKE_BOTTLES',
        'Revenue from Coke bottles',
        'GST',
        'Active'
    ),
    (
        '4fa85f64-5717-4562-b3fc-2c963f66afa7',
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        'Revenue',
        'Coke Syrup Revenue',
        'COKE_SYRUP',
        'Revenue from Coke syrup',
        'GST',
        'Active'
    ),
    (
        '4fa85f64-5717-4562-b3fc-2c963f66afb6',
        '3fa85f64-5717-4562-b3fc-2c963f66afb7',
        'Revenue',
        'Fanta Bottles Revenue',
        'FANTA_BOTTLES',
        'Revenue from Fanta bottles',
        'GST',
        'Active'
    ),
    (
        '4fa85f64-5717-4562-b3fc-2c963f66afb7',
        '3fa85f64-5717-4562-b3fc-2c963f66afb7',
        'Revenue',
        'Fanta Syrup Revenue',
        'FANTA_SYRUP',
        'Revenue from Fanta syrup',
        'GST',
        'Active'
    ),
    (
        '4fa85f64-5717-4562-b3fc-2c963f66afc6',
        '3fa85f64-5717-4562-b3fc-2c963f66afc8',
        'Revenue',
        'Sprite Small Can Revenue',
        'SPRITE_SMALL_CAN',
        'Revenue from Sprite small cans',
        'GST',
        'Active'
    ),
    (
        '4fa85f64-5717-4562-b3fc-2c963f66afc7',
        '3fa85f64-5717-4562-b3fc-2c963f66afc8',
        'Revenue',
        'Sprite Large Can Revenue',
        'SPRITE_LARGE_CAN',
        'Revenue from Sprite large cans',
        'GST',
        'Active'
    );

INSERT INTO
    Bank_Transactions (
        entity_id,
        transaction_id,
        transaction_status,
        contact_id,
        contact_name,
        transaction_date,
        bank_account_id,
        bank_account_code,
        bank_account_name,
        transaction_currency,
        currency_rate,
        transaction_type,
        account_code,
        item_ID,
        item_description,
        item_quantity,
        item_unit_price,
        sub_total,
        total_tax,
        total_amount
    )
VALUES (
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        'T123456',
        'Completed',
        'C123',
        'John Doe',
        '2024-05-01 12:00:00+00',
        '4fa85f64-5717-4562-b3fc-2c963f66afa6',
        'COKE_ACC',
        'Coke Bank Account',
        'USD',
        1.0,
        'Sale',
        'COKE_BOTTLES',
        'I123',
        'Coke Bottle Sale',
        100,
        1.50,
        150.00,
        15.00,
        165.00
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afb7',
        'T123457',
        'Completed',
        'C124',
        'Jane Smith',
        '2024-05-02 12:00:00+00',
        '4fa85f64-5717-4562-b3fc-2c963f66afb6',
        'FANTA_ACC',
        'Fanta Bank Account',
        'USD',
        1.0,
        'Sale',
        'FANTA_BOTTLES',
        'I124',
        'Fanta Bottle Sale',
        200,
        1.75,
        350.00,
        35.00,
        385.00
    ),
    (
        '3fa85f64-5717-4562-b3fc-2c963f66afc8',
        'T123458',
        'Completed',
        'C125',
        'Jim Beam',
        '2024-05-03 12:00:00+00',
        '4fa85f64-5717-4562-b3fc-2c963f66afc6',
        'SPRITE_ACC',
        'Sprite Bank Account',
        'USD',
        1.0,
        'Sale',
        'SPRITE_SMALL_CAN',
        'I125',
        'Sprite Small Can Sale',
        150,
        1.20,
        180.00,
        18.00,
        198.00
    );