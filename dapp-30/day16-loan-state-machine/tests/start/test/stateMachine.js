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
  });

  it('Should NOT accept fund if not exact amount', async () => {
  });

  it('Should accept fund', async () => {
  });

  it('Should NOT reimburse if not lender', async () => {
  });

  it('Should NOT reimburse if not exact amount', async () => {
  });

  it('Should NOT reimburse if loan hasnt matured yet', async () => {
  });
  
  it('Should reimburse', async () => {
  });
});
