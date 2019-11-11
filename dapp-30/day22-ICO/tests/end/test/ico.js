const { expectRevert, expectEvent } = require('@openzeppelin/test-helpers');
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
    const _name = await token.name();
    const _symbol = await token.symbol();
    const _decimals = await token.decimals();
    const totalSupply = await token.totalSupply();
    assert(_name === name);
    assert(_symbol === symbol);
    assert(_decimals.eq(web3.utils.toBN(decimals)));
    assert(totalSupply.eq(initialBalance));
  });

  it('should start the ICO', async () => {
    const duration = 100;
    const price = 1;
    const availableTokens = web3.utils.toWei('100');
    const minPurchase = web3.utils.toWei('10'); 
    const maxPurchase = web3.utils.toWei('20');
    await ico.start(duration, price, availableTokens, minPurchase, maxPurchase); 

    const expectedEnd = Math.floor(((new Date()).getTime() / 1000)) + duration;
    const end = await ico.end();
    const actualPrice = await ico.price();
    const actualAvailableTokens = await ico.availableTokens();
    const actualMinPurchase = await ico.minPurchase();
    const actualMaxPurchase = await ico.maxPurchase();
    assert(end.eq(web3.utils.toBN(expectedEnd)));
    assert(actualAvailableTokens.eq(web3.utils.toBN(availableTokens)));
    assert(actualMinPurchase.eq(web3.utils.toBN(minPurchase)));
    assert(actualMaxPurchase.eq(web3.utils.toBN(maxPurchase)));
  });

  it('should NOT start the ICO', async () => {
    const duration = 100;
    const price = 1;
    let availableTokens = web3.utils.toWei('10000');
    const minPurchase = web3.utils.toWei('10'); 
    let maxPurchase = web3.utils.toWei('20');
    await expectRevert(
      ico.start(duration, price, availableTokens, minPurchase, maxPurchase), 
      'totalSupply should be > 0 and <= totalSupply'
    );
    availableTokens = web3.utils.toWei('100');
    maxPurchase = web3.utils.toWei('200');
    await expectRevert(
      ico.start(duration, price, availableTokens, minPurchase, maxPurchase), 
      '_maxPurchase should be > 0 and <= _availableTokens'
    );
  });

  context('Sale started', () => {
    const duration = 100;
    const price = 2;
    const availableTokens = web3.utils.toWei('30');
    const minPurchase = web3.utils.toWei('1'); 
    const maxPurchase = web3.utils.toWei('10');
    beforeEach(async() => {
      ico.start(duration, price, availableTokens, minPurchase, maxPurchase); 
    });

    it('should NOT let non-investors buy', async () => {
      await expectRevert(
        ico.buy({from: accounts[2], value: web3.utils.toWei('1')}),
        'only investors'
      );
    });

    it('should NOT buy non-multiple of price', async () => {
      await ico.whitelist(accounts[2]);
      const value = web3.utils.toBN(web3.utils.toWei('1'))
        .add(web3.utils.toBN(1));
      await expectRevert(
        ico.buy({from: accounts[2], value}),
        'have to send a multiple of price'
      );
    });

    it('should NOT buy if not between min and max purchase', async () => {
      await ico.whitelist(accounts[2]);
      let value = web3.utils.toBN(minPurchase).sub(web3.utils.toBN(2)); 
      await expectRevert(
        ico.buy({from: accounts[2], value}),
        'have to send between minPurchase and maxPurchase'
      );
      value = web3.utils.toBN(maxPurchase).add(web3.utils.toBN(2)); 
      await expectRevert(
        ico.buy({from: accounts[2], value}),
        'have to send between minPurchase and maxPurchase'
      );
    });

    it('should NOT buy if not enough tokens left', async () => {
      await ico.whitelist(accounts[2]);
      await ico.buy({from: accounts[2], value: web3.utils.toWei('10')}),
      await expectRevert(
        ico.buy({from: accounts[2], value: web3.utils.toWei('10')}),
        'Not enough tokens left for sale'
      );
    });

  });



  //it('should return the correct balance', async () => {
  //  const balance = await token.balanceOf(accounts[0]);
  //  assert(balance.eq(initialBalance));
  //});

  //it('should transfer token', async () => {
  //  const transfer = web3.utils.toBN(100);
  //  const receipt = await token.transfer(accounts[1], transfer);
  //  const balance1 = await token.balanceOf(accounts[0]);
  //  const balance2 = await token.balanceOf(accounts[1]);
  //  const initialBalance = web3.utils.toBN(web3.utils.toWei('1'));
  //  assert(balance1.eq(initialBalance.sub(transfer)));
  //  expectEvent(receipt, 'Transfer', {
  //    from: accounts[0],
  //    to: accounts[1],
  //    tokens: transfer
  //  });
  //});

  //it('should NOT transfer token if balance too low', async () => {
  //  await expectRevert(
  //    token.transfer(accounts[1], web3.utils.toWei('10')),
  //    'token balance too low'
  //  );
  //});

  //it('should transfer token when approved', async () => {
  //  let allowance;
  //  let receipt;
  //  const _100 = web3.utils.toBN(100);

  //  allowance = await token.allowance(accounts[0], accounts[1]);
  //  assert(allowance.isZero());

  //  receipt = await token.approve(accounts[1], _100);
  //  allowance = await token.allowance(accounts[0], accounts[1]);
  //  assert(allowance.eq(_100));
  //  expectEvent(receipt, 'Approval', {
  //    tokenOwner: accounts[0],
  //    spender: accounts[1],
  //    tokens: _100
  //  });

  //  receipt = await token.transferFrom(
  //    accounts[0], 
  //    accounts[2], 
  //    _100, 
  //    {from: accounts[1]}
  //  );
  //  allowance = await token.allowance(accounts[0], accounts[1]);
  //  const balance1 = await token.balanceOf(accounts[0]);
  //  const balance2 = await token.balanceOf(accounts[2]);
  //  assert(balance1.eq(initialBalance.sub(_100)));
  //  assert(balance2.eq(_100));
  //  assert(allowance.isZero());
  //  expectEvent(receipt, 'Transfer', {
  //    from: accounts[0],
  //    to: accounts[2],
  //    tokens: _100
  //  });
  //});

  //it('should NOT transfer token if not approved', async () => {
  //  await expectRevert(
  //    token.transferFrom(accounts[0], accounts[1], 10),
  //    'allowance too low'
  //  );
  //});

});
