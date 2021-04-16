const Token = artifacts.require('ETBToken.sol');

contract('Token', accounts=> {
  let token;
  const [admin, _] = accounts;
  const TOTAL_SUPPLY = web3.utils.toWei('1000000');

  before(async () => {
    token = await Token.new();
  });

  it('admin should have total supply', async () => {
    const totalSupply = await token.totalSupply();
    const balanceAdmin = await token.balanceOf(admin);
    assert(totalSupply.toString() === TOTAL_SUPPLY);
    assert(balanceAdmin.toString() === TOTAL_SUPPLY);
  });
});
