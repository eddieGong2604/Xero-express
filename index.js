const express = require("express");
const axios = require("axios");
const db = require("./db/init");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Function to parse Xero timestamp format into a JavaScript Date object
function parseXeroTimestamp(xeroTimestamp) {
  // Extract the timestamp value from the Xero format
  const timestamp = parseInt(
    xeroTimestamp.replace("/Date(", "").replace(")/", "")
  );
  // Convert milliseconds since Unix epoch to JavaScript Date object
  // console.log("Date: " + new Date(timestamp) )
  return new Date(timestamp);
}
app.get("/fetch-data", async (req, res) => {
  try {
    console.log("TOKEN:", process.env.XERO_ACCESS_TOKEN);
    // const [accountsResponse, bankTransactionsResponse] = await Promise.all([
    //   // axios.get(`${xeroApiBase}/assets`, { headers: { Authorization: `Bearer ${process.env.XERO_ACCESS_TOKEN}` } }),
    //   axios.get(`https://api.xero.com/api.xro/2.0/Accounts`, {
    //     headers: { Authorization: `Bearer ${process.env.XERO_ACCESS_TOKEN}`}
    //   }),
    //   axios.get(`https://api.xero.com/api.xro/2.0/BankTransactions`, {
    //     headers: { Authorization: `Bearer ${process.env.XERO_ACCESS_TOKEN}` },
    //   }),
    // ]);

    // // const assets = assetsResponse.data.Assets;
    // const accounts = accountsResponse.data.Accounts;
    // const bankTransactions = bankTransactionsResponse.data.BankTransactions;

    // // Insert data into PostgreSQL

    // // There is no entity_ID atm, so I will pretend account_id is entity_id
    //     for (const account of accounts) {
    //       await db.query(
    //           `INSERT INTO chart_of_accounts (
    //               account_id,
    //               entity_id,
    //               account_type,
    //               account_name,
    //               account_code,
    //               account_description,
    //               tax_type,
    //               account_status
    //           ) VALUES (
    //               $1, $2, $3, $4, $5, $6, $7, $8
    //           );`,
    //           [
    //               account.AccountID,
    //               account.AccountID,
    //               account.Type,
    //               account.Name,
    //               account.Code,
    //               account.Description ? account.Description: null,
    //               account.TaxType,
    //               account.Status
    //           ]
    //       );
    //   }

    // //   console.log(bankTransactions[0].Contact.ContactID)
    // //   There is no entity_ID so I assume transaction is entity_id
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
    //         item_ID,
    //         item_description,
    //         item_quantity,
    //         item_unit_price,
    //         sub_total,
    //         total_tax,
    //         total_amount
    //     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
    //     [
    //         transaction.BankTransactionID,
    //         transaction.BankTransactionID,
    //         transaction.Status,
    //         transaction.Contact ? transaction.Contact.ContactID : null,
    //         transaction.Contact ? transaction.Contact.Name : null,
    //         parseXeroTimestamp(transaction.Date),
    //         transaction.BankAccount ? transaction.BankAccount.AccountID : null,
    //         transaction.BankAccount ? transaction.BankAccount.Code : null,
    //         transaction.BankAccount ? transaction.BankAccount.Name : null,
    //         transaction.CurrencyCode,
    //         transaction.CurrencyRate ? transaction.CurrencyRate : null,
    //         transaction.Type,
    //         transaction.LineItems ? transaction.LineItems.LineItemID : null,
    //         transaction.LineItems ? transaction.LineItems.Description : null,
    //         transaction.LineItems ? transaction.LineItems.Quantity : null,
    //         transaction.LineItems ? transaction.LineItems.UnitAmount : null,
    //         transaction.SubTotal,
    //         transaction.TotalTax,
    //         transaction.Total
    //     ]
    // );

    // }

    res.send("Successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching data from Xero");
  }
});

db.createDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
