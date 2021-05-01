// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from 'mongoose';
import Web3 from 'web3';

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

export default async (req, res) => {
  //1. get record
  await mongoose.connect(
    process.env.DB_URL, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const recipient = await Recipient
    .findOne({ address: req.body.address && req.body.address.toLowerCase() })
    .exec();
  //2. if record found, return signature
  if(recipient) {
    const message = Web3.utils.soliditySha3(
      {t: 'address', v: recipient.address},
      {t: 'uint256', v: recipient.totalAllocation.toString()}
    ).toString('hex');
    const web3 = new Web3('');
    const { signature } = web3.eth.accounts.sign(
      message, 
      process.env.PRIVATE_KEY
    );
    res
      .status(200)
      .json({ 
        address: req.body.address, 
        basicAllocation: recipient.basicAllocation,
        bonusAllocation: recipient.bonusAllocation,
        totalAllocation: recipient.totalAllocation,
        signature
      });
    return;
  }
  //3. otherwise, return error
  res
    .status(401)
    .json({ address: req.body.address });
}
