require('dotenv').config();
const moment = require('moment');
const getTransactions = require('./transactions.js');
const getPrices = require('./prices.js');
const updateSpreadsheet = require('./google.js');

const init = async () => {
  console.log('Starting crypto accounting...');
  console.log(`Address: ${process.env.ADDRESS}`);
  console.log(`From: ${moment(process.env.START_DATE).local().format('YYYY-MM-DD HH:mm')}`);
  console.log(`To: ${moment(process.env.END_DATE).local().format('YYYY-MM-DD HH:mm')}`);

  console.log('Fetching transactions...');
  const txs = await getTransactions();

  console.log('Fetching crypto prices...');
  const txWithPrices = await getPrices(txs)

  console.log('Updating google sheets...');
  const updatedRows = await updateSpreadsheet(txWithPrices);

  console.log(`${updatedRows} transactions added`);
};
init();
