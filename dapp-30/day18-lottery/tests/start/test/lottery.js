const { expectRevert, time } = require('@openzeppelin/test-helpers');
const Lottery = artifacts.require('Lottery.sol');

contract('Lottery', (accounts) => {
  let lottery;
  beforeEach(async () => {
    lottery = await Lottery.new(2);
  });
  
  it('Should NOT create bet if not admin', async () => {
  });

  it('Should NOT create bet if state not idle', async () => {
  });

  it('Should create a bet', async () => {
  });

  it('Should NOT bet if not in state BETTING', async () => {
  });

  it('Should NOT bet if not sending exact bet amount', async () => {
  });

  it('Should bet', async () => {
  });

  it('Should NOT cancel if not betting', async () => {
  });

  it('Should NOT cancel if not admin', async () => {
  });

  it('Should cancel', async () => {
  });
});
