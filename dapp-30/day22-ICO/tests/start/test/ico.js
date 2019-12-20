const { expectRevert, time } = require('@openzeppelin/test-helpers');
const ICO = artifacts.require('ICO.sol');
const Token = artifacts.require('ERC20Token.sol');

contract('ICO', accounts => {
  let ico;
  let token;
  const name = 'My Token';
  const symbol = 'TKN'; 
  const decimals = 18;
  const initialBalance = web3.utils.toBN(web3.utils.toWei('1000'));

  beforeEach(async () => {
    ico = await ICO.new(name, symbol, decimals, initialBalance); 
    const tokenAddress = await ico.token();
    token = await Token.at(tokenAddress); 
  });

  it('should create an erc20 token', async () => {
  });

  it('should start the ICO', async () => {
  });

  it('should NOT start the ICO', async () => {
  });

  context('Sale started', () => {
    let start;
    const duration = 100;
    const price = 2;
    const availableTokens = web3.utils.toWei('30');
    const minPurchase = web3.utils.toWei('1'); 
    const maxPurchase = web3.utils.toWei('10');
    beforeEach(async() => {
     start = parseInt((new Date()).getTime() / 1000);
      time.increaseTo(start);
      ico.start(duration, price, availableTokens, minPurchase, maxPurchase); 
    });

    it('should NOT let non-investors buy', async () => {
    });

    it('should NOT buy non-multiple of price', async () => {
    });

    it('should NOT buy if not between min and max purchase', async () => {
    });

    it('should NOT buy if not enough tokens left', async () => {
    });

    it(
      'full ico process: investors buy, admin release and withdraw', 
      async () => {
    });
  });
});
