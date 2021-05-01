require('dotenv').config({path: '../.env'});
const fs = require('fs');
const parse = require('csv-parse');
const mongoose = require('mongoose');

const init = async () => {
  const recipientSchema = new mongoose.Schema({
    address: String,
    basicAllocation: String,
    bonusAllocation: String,
    totalAllocation: String
  });
  const Recipient = mongoose.models.Recipient || mongoose.model(
    'Recipient', 
    recipientSchema, 
    'recipients'
  );
  await mongoose.connect(
    process.env.DB_URL, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const allocations = [];
  const airdrop = fs
    .createReadStream('./airdrop.csv')
    .pipe(parse({
  }));
  for await (const allocation of airdrop) {
    if(allocation[1] && allocation[1].trim().length === 42) {
      allocations.push({
        address: allocation[1].trim().toLowerCase(),
        basicAllocation: allocation[5],
        bonusAllocation: allocation[6],
        totalAllocation: allocation[7],
      });
    }
  }
  await Recipient.insertMany(allocations)
  console.log(`Inserted ${allocations.length} records`);
}

init();
