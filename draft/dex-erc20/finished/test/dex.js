const Dex = artifacts.require('DEX');
const EOS = artifacts.require('EOS');
const OMG = artifacts.require('OMG');

const tokenBalances = async (dex, accounts) => {
  const balances = [];
  balances.push(await dex.balanceOf(accounts[3], 'EOS')); 
  balances.push(await dex.balanceOf(accounts[3], 'OMG')); 
  balances.push(await dex.balanceOf(accounts[4], 'EOS')); 
  balances.push(await dex.balanceOf(accounts[4], 'OMG')); 
  return balances;
};

contract('Dex', (accounts) => {
  let eos, omg, dex;
  before(() => {
    eos = EOS.at(EOS.address);
    omg = OMG.at(OMG.address);
    dex = Dex.at(Dex.address);
  });

  it('Deployment should pre-fund ERC20 tokens for accounts 3 & 4', async () => {
    const balances = [];
    const tokens = [eos, omg];
    const addresses = [accounts[3], accounts[4]];
    balances.push(await eos.balanceOf(accounts[3]));
    balances.push(await omg.balanceOf(accounts[3]));
    balances.push(await eos.balanceOf(accounts[4]));
    balances.push(await omg.balanceOf(accounts[4]));
    balances.map((balance) => assert.equal(balance.valueOf(), 1000));
  });

  it('valueOf() should return an initial null token balance', async () => {
    const balances = await tokenBalances(dex, accounts);
    balances.map((balance) => assert.equal(balance.valueOf(), 0));
  });

  it('deposit() should increment balance of sending address', async () => {
    await dex.deposit(10, 'EOS', {from:  accounts[3]});
    await dex.deposit(11, 'OMG', {from:  accounts[3]});
    await dex.deposit(12, 'EOS', {from:  accounts[4]});
    await dex.deposit(13, 'OMG', {from:  accounts[4]});
    const balances = await tokenBalances(dex, accounts);
    [10, 11, 12, 13].forEach((expected, i) => {
      assert.equal(balances[i].valueOf(), expected);
    });
  });
});
