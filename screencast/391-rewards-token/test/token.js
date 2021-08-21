const { time } = require('@openzeppelin/test-helpers');
const Reward = artifacts.require('Reward.sol');
const Token = artifacts.require('Token.sol');

contract('Token', accounts => {
  let reward, token;
  const [admin, investor, _] = accounts;

  beforeEach(async () => {
    reward = await Reward.new();
    token = await Token.new(reward.address);
    await reward.transfer(token.address, 1000);
    const functionSignature = web3.eth.abi.encodeFunctionSignature(
      'setRewards(uint32,uint32,uint96)'
    );
    await token.grantRole(functionSignature, admin);
  });

  it('should give rewards', async () => {
    const { timestamp } = await web3.eth.getBlock('latest');
    const start = timestamp;
    const end = timestamp + 10;
    await token.setRewards(start, end, 2);
    await token.transfer(investor, 10);
    await time.increase(10);
    await token.claim(investor, {from: investor});
    const rewardBalance = await reward.balanceOf(investor);
    console.log(rewardBalance.toString());
    //to fix: it doesn't distribute token
  });
});
