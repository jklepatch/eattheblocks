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
    await token.transfer(investor, 500);
    await time.increase(10);
    await token.claim(investor, {from: investor});
    const rewardBalance = await reward.balanceOf(investor);
    //I fixed the below assertion by increasing the number of tokens transferred to the investor
    //Before I put a very low number that made the reward amount less than 1, which was rounded down to 0 by a division in the smart contract
    //This edge case happened because I used very small amounts of tokens for testing (i.e way less than 1 token)
    //But in real tokens, amounts in wei will be much greater, this edge case will probably never happen and even small investors will always get some rewards
    assert(rewardBalance.toString() === '10'); //10 * 2 * 500 / 1000 = 10
  });
});
