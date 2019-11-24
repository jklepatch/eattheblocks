const { expectRevert, time } = require('@openzeppelin/test-helpers');
const StateMachine = artifacts.require('StateMachine.sol');

contract('StateMachine', (accounts) => {
  let stateMachine;
  const amount = 1000;
  const interest = 100;
  const duration = 100;

  const [borrower, lender] = [accounts[1], accounts[2]];
  before(async () => {
    stateMachine = await StateMachine.deployed();
  });

  it('Should NOT accept fund if not lender', async () => {
    await expectRevert(
      stateMachine.fund({from: borrower, value: amount}),
      'only lender can lend'
    );
  });

  it('Should NOT accept fund if not exact amount', async () => {
    await expectRevert(
      stateMachine.fund({from: lender, value: 50}),
      'can only lend the exact amount'
    );
    await expectRevert(
      stateMachine.fund({from: lender, value: 150}),
      'can only lend the exact amount'
    );
  });

  it('Should accept fund', async () => {
    const balanceBefore = web3.utils.toBN(
      await web3.eth.getBalance(borrower)
    );
    await stateMachine.fund({from: lender, value: amount});
    const balanceAfter = web3.utils.toBN(
      await web3.eth.getBalance(borrower)
    );
    const state = await stateMachine.state();
    assert(state.toNumber() === 1);
    assert(balanceAfter.sub(balanceBefore).toNumber() === amount);
  });

  it('Should NOT reimburse if not lender', async () => {
    await expectRevert(
      stateMachine.reimburse({from: accounts[5], value: amount + interest}),
      'only borrower can reimburse'
    );
  });

  it('Should NOT reimburse if not exact amount', async () => {
    await expectRevert(
      stateMachine.reimburse({from: borrower , value: 50}),
      'borrower need to reimburse exactly amount + interest'
    );
  });

  it('Should NOT reimburse if loan hasnt matured yet', async () => {
    await expectRevert(
      stateMachine.reimburse({from: borrower, value: amount + interest}),
      'loan hasnt matured yet'
    );
  });
  
  it('Should reimburse', async () => {
    time.increase(duration + 10);
    const balanceBefore = web3.utils.toBN(
      await web3.eth.getBalance(lender)
    );
    await stateMachine.reimburse({from: borrower, value: amount + interest});
    const balanceAfter = web3.utils.toBN(
      await web3.eth.getBalance(lender)
    );
    const state = await stateMachine.state();
    assert(state.toNumber() === 2);
    assert(balanceAfter.sub(balanceBefore).toNumber() === (amount + interest));
  });
});
