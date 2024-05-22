const express = require("express");
const axios = require("axios");
const db = require("./db/init");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Function to parse Xero timestamp format into a JavaScript Date object
function parseXeroTimestamp(xeroTimestamp) {
  // Extract the timestamp value from the Xero format
  const timestamp = parseInt(xeroTimestamp.replace("/Date(", "").replace(")/", ""));
  // Convert milliseconds since Unix epoch to JavaScript Date object
  // console.log("Date: " + new Date(timestamp) )
  return new Date(timestamp);
}
app.get("/fetch-data", async (req, res) => {
  try {
    const [accountsResponse, bankTransactionsResponse] = await Promise.all([
      // axios.get(`${xeroApiBase}/assets`, { headers: { Authorization: `Bearer ${process.env.XERO_ACCESS_TOKEN}` } }),
      axios.get(`https://api.xero.com/api.xro/2.0/Accounts`, {
        headers: { Authorization: `Bearer ${process.env.XERO_ACCESS_TOKEN}` },
      }),
      axios.get(`https://api.xero.com/api.xro/2.0/BankTransactions`, {
        headers: { Authorization: `Bearer ${process.env.XERO_ACCESS_TOKEN}` },
      }),
    ]);

    // const assets = assetsResponse.data.Assets;
    const accounts = accountsResponse.data.Accounts;
    const bankTransactions = bankTransactionsResponse.data.BankTransactions;
 
    // Insert data into PostgreSQL

   // There is no entity_ID atm, so I will pretend account_id is entity_id
  //   for (const account of accounts) {
  //     await db.query(
  //         `INSERT INTO chart_of_accounts (
  //             account_id,
  //             entity_id,
  //             account_type,
  //             account_name,
  //             account_code,
  //             account_description,
  //             tax_type,
  //             account_status
  //         ) VALUES (
  //             $1, $2, $3, $4, $5, $6, $7, $8
  //         );`,
  //         [
  //             account.AccountID,
  //             account.AccountID,
  //             account.Type,
  //             account.Name,
  //             account.Code,
  //             account.Description ? account.Description: null,
  //             account.TaxType,
  //             account.Status
  //         ]
  //     );
  // }
  
  // console.log(bankTransactions[0].Contact.ContactID)
  // There is no entity_ID so I assume transaction is entity_id
    // for( const transaction of bankTransactions){
      
    //   await db.query(
    //     `INSERT INTO bank_transactions (
    //         entity_id,
    //         transaction_id,
    //         transaction_status,
    //         contact_id,
    //         contact_name,
    //         transaction_date,
    //         bank_account_id,
    //         bank_account_code,
    //         bank_account_name,
    //         transaction_currency,
    //         currency_rate,
    //         transaction_type,
    //         account_code,
    //         item_ID,
    //         item_description,
    //         item_quantity,
    //         item_unit_price,
    //         sub_total,
    //         total_tax, 
    //         total_amount 
    //     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
    //     )`,
    //     [
    //         transaction.BankTransactionID,
    //         transaction.BankTransactionID,
    //         transaction.Status,
    //         transaction.Contact ? transaction.Contact.ContactID : null,
    //         transaction.Contact ? transaction.Contact.Name : null,
    //         parseXeroTimestamp(transaction.Date),
    //         transaction.BankAccount.AccountID,
    //         transaction.BankAccount.Code,
    //         transaction.BankAccount.Name,

    //         transaction.CurrencyCode,

    //         transaction.Reference,
    //         transaction.CurrencyRate? transaction.CurrencyRate : null,
    //         transaction.Type,
    //         transaction.BankAccount.Code,
    //         transaction.LineItems? transaction.LineItems.LineItemID : null,
    //         transaction.LineItems? transaction.LineItems.Description : null,
    //         transaction.LineItems? transaction.LineItems.Quantity : null,
    //         transaction.LineItems? transaction.LineItems.UnitAmount : null,

    //         transaction.SubTotal,
    //         transaction.TotalTax,
    //         transaction.Total
    //     ]
    // );
    // }

    await db.query(`
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
    `)


    res.send("Successful");
  } catch (error) {
    console.error("Error fetching data from Xero:", error);
    res.status(500).send("Error fetching data from Xero");
  }
});

// db.createTables().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

db.createDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running ')
  })
});