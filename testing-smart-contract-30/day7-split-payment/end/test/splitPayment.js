const SplitPayment = artifacts.require('SplitPayment');

contract('SplitPayment', (accounts) => {
  let splitPayment = null;
  before(async () => {
    splitPayment = await SplitPayment.deployed();
  });

  it('should split payment', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [40, 20, 30];
    const initialBalances = await Promise.all(recipients.map(async (recipient) => {
      return await web3.eth.getBalance(recipient);
    }));
    await splitPayment.send(
      recipients, 
      amounts, 
      {from: accounts[0], value: 90}
    ); 
    const finalBalances = await Promise.all(recipients.map(async (recipient) => {
      return await web3.eth.getBalance(recipient);
    }));

    recipients.forEach((_item, i) => {
      const finalBalance = web3.utils.toBN(finalBalances[i]);
      const initialBalance = web3.utils.toBN(initialBalances[i]);
      assert(finalBalance.sub(initialBalance).toNumber() === amounts[i]);
    });
  });

  it('should not split payment if array length mismatch', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [40, 20];
    try {
      await splitPayment.send(
        recipients, 
        amounts, 
        {from: accounts[0], value: 90}
      ); 
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert to must be same length as amount -- Reason given: to must be same length as amount.');
      return;
    }
    assert(false);
  });

  it('should not split payment if caller is not the owner', async () => {
    const recipients = [accounts[1], accounts[2], accounts[3]];
    const amounts = [40, 20, 30];
    try {
      await splitPayment.send(
        recipients, 
        amounts, 
        {from: accounts[1], value: 90}
      ); 
    } catch(e) {
      assert(e.message === 'Returned error: VM Exception while processing transaction: revert');
      return;
    }
    assert(false);
  });
});
