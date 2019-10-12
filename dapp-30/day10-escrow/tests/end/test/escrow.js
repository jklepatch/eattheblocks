const Escrow = artifacts.require('Escrow');

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('Escrow', accounts => {
  let escrow = null;
  const [lawyer, payer, recipient] = accounts;
  before(async () => {
    escrow = await Escrow.deployed();
  });

  it('should deposit', async () => {
    await escrow.deposit({from: payer, value: 900});
    const escrowBalance = parseInt(await web3.eth.getBalance(escrow.address));
    assert(escrowBalance === 900);
  });

  it('should NOT deposit if transfer exceed total escrow amount', async () => {
    assertError(
      escrow.deposit({from: payer, value: 1000}),
      'Cant send more than escrow amount'
    );
  });

  it('should NOT deposit if not sending from payer', async () => {
    assertError(
      escrow.deposit({from: accounts[5]}),
      'Sender must be the payer'
    );
  });

  it('should NOT release if full amount not received', async () => {
    assertError(
      escrow.release({from: lawyer}),
      'cannot release funds before full amount is sent'
    );
  });

  it('should NOT release if not lawyer', async () => {
    await escrow.deposit({from: payer, value: 100}); //We are missing 100 wei
    assertError(
      escrow.release({from: payer}),
      'only lawyer can release funds'
    );
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

