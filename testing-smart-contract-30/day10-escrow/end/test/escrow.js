const Escrow = artifacts.require('Escrow');

contract('Escrow', (accounts) => {
  let escrow = null;
  const lawyer = accounts[0];
  const payer = accounts[1];
  const recipient = accounts[2];
  before(async () => {
    escrow = await Escrow.deployed();
  });

  it('should deposit', async () => {
    await escrow.deposit({from: payer, value: 900});
    const escrowBalance = web3.utils.toBN(await web3.eth.getBalance(escrow.address));
    assert(escrowBalance.toNumber() === 900);
  });

  it('should NOT deposit if transfer exceed total escrow amount', async () => {
    try {
      await escrow.deposit({from: payer, value: 1000});
    } catch(e) {
      assert(e.message.includes('Cant send more than escrow amount'));
      return;
    }
    assert(false);
  });

  it('should NOT deposit if not sending from payer', async () => {
    try {
      await escrow.deposit({from: accounts[5]});
    } catch(e) {
      assert(e.message.includes('Sender must be the payer'));
      return;
    }
    assert(false);
  });

  it('should NOT release if full amount not received', async () => {
    try {
      await escrow.release({from: lawyer});
    } catch(e) {
      assert(e.message.includes('cannot release funds before full amount is sent'));
      return;
    }
    assert(false);
  });

  it('should NOT release if not lawyer', async () => {
    await escrow.deposit({from: payer, value: 100}); //We are missing 100 wei
    try {
      await escrow.release({from: payer});
    } catch(e) {
      assert(e.message.includes('only lawyer can release funds'));
      return;
    }
    assert(false);
  });

  it('should release', async () => {
    const initialRecipientBalance = web3.utils.toBN(
      await web3.eth.getBalance(recipient)
    );
    await escrow.release({from: lawyer});
    const finalRecipientBalance = web3.utils.toBN(
      await web3.eth.getBalance(recipient)
    );
    assert(finalRecipientBalance.sub(initialRecipientBalance).toNumber() === 1000);
  });
  
});

