const StateMachine = artifacts.require('StateMachine');
const timeHelper = require('ganache-time-traveler');

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('StateMachine', (accounts) => {
  let stateMachine = null;
  const borrower = accounts[1];
  const lender = accounts[2];
  before(async () => {
    stateMachine = await StateMachine.deployed();
  });

  it('Should NOT accept the funding if sender is not lender', async () => {
    await assertError(
      stateMachine.fund({value: 10, from: borrower}),
      'only lender can lend'
    );
  });

  it('Should NOT accept the funding if not exact amount sent', async () => {
    await assertError(
      stateMachine.fund({value: 9, from: lender}),
      'can only lend the exact amount'
    );
    await assertError(
      stateMachine.fund({value: 11, from: lender}),
      'can only lend the exact amount'
    );
  });

  it('Should accept the funding', async () => {
    const balanceBefore = web3.utils.toBN(
      await web3.eth.getBalance(borrower)
    );
    await stateMachine.fund({
      value: 10, 
      from: lender
    });
    const balanceAfter = web3.utils.toBN(
      await web3.eth.getBalance(borrower)
    );
    const state = await stateMachine.state();
    assert(state.toNumber() === 1); // 1 is active
    assert(balanceAfter.sub(balanceBefore).toNumber() === 10);
  });

  it('Should NOT accept any funding once funding was already done', async () => {
    await assertError(
      stateMachine.fund({value: 10, from: lender}),
      'cannot transition to same state'
    );
  });

  it('Should NOT reimburse if sender is not borrower', async () => {
    await assertError(
      stateMachine.reimburse({
        from: lender,
        value: 11
      }),
      'only borrower can reimburse'
    );
  });

  it('Should NOT reimburse if not exact amount sent', async () => {
    await assertError(
      stateMachine.reimburse({
        from: borrower,
        value: 9
      }),
      'borrower need to reimburse exactly amount + interest'
    );
    await assertError(
      stateMachine.reimburse({
        from: borrower,
        value: 12
      }),
      'borrower need to reimburse exactly amount + interest'
    );
  });

  it('Should NOT reimburse if loan hasnt matured yet', async () => {
    await assertError(
      stateMachine.reimburse({
        from: borrower,
        value: 11
      }),
      'loan hasnt matured yet'
    );
  });

  it('Should reimburse', async () => {
    const balanceBefore = web3.utils.toBN(
      await web3.eth.getBalance(lender)
    );
    //await sleep(2000);
    timeHelper.advanceTime(2);
    await stateMachine.reimburse({
      from: borrower,
      value: 11
    });
    const balanceAfter = web3.utils.toBN(
      await web3.eth.getBalance(lender)
    );
    const state = await stateMachine.state();
    assert(balanceAfter.sub(balanceBefore).toNumber() === 11);
    assert(state.toNumber() === 2);
  });
});
