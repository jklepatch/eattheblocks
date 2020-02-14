const DEX = artifacts.require('dex');
const WETH = artifacts.require('WETH');
const EOS = artifacts.require('EOS');
const OMG = artifacts.require('OMG');
const TESTTOKEN = artifacts.require('TestToken');
const { artifactToWeb3 } = require('../utils'); 

const BUY_ORDER = 0;
const SELL_ORDER = 1;

//const tokenBalances = async (dex, accounts) => {
//  const balances = [];
//  balances.push(await dex.balanceOf(accounts[3], 'EOS')); 
//  balances.push(await dex.balanceOf(accounts[3], 'OMG')); 
//  balances.push(await dex.balanceOf(accounts[4], 'EOS')); 
//  balances.push(await dex.balanceOf(accounts[4], 'OMG')); 
//  return balances;
//};

let admin, testTokenAdmin,  buyer, seller;
let dex, testToken; 

contract('Dex', (accounts) => {
  before(async () => {
    admin = accounts[0];
    testTokenAdmin = accounts[4];
    buyer = accounts[5];
    seller = accounts[6];
    dex = await artifactToWeb3(DEX, web3);
    testToken = await artifactToWeb3(TESTTOKEN, web3);
  });

  it('addToken() should add token', async () => {
    await dex.methods
      .addToken(
        web3.utils.fromAscii('TestToken'), 
        testToken.options.address
      )
      .send({from: admin, gas: 200000})

    const tokens = await dex.methods
      .getTokens()
      .call()

    const tokenAdded = tokens.filter(t => web3.utils.toUtf8(t.ticker) === 'TestToken');
    assert(tokenAdded.length === 1);
  });

  it('addToken() should update token', async () => {
    await dex.methods
      .addToken(
        web3.utils.fromAscii('EOS'), 
        accounts[9]
      )
      .send({from: admin, gas: 200000})

    const tokens = await dex.methods
      .getTokens()
      .call()

    const tokenUpdated = tokens.filter(t => (
      web3.utils.toUtf8(t.ticker) === 'EOS'
      && t.at === accounts[9] 
    ));

    assert(tokenUpdated.length === 1);
  });
});

/*
contract('Dex', (accounts) => {
  before(async () => {
    dex = await artifactToWeb3(DEX, web3);
  });

  it('deposit() should increment sender balance', async () => {
    await dex.methods
      .deposit(
        10, 
        web3.utils.fromAscii('EOS') 
      )
      .send({from: buyer});

    await dex.methods
      .deposit(
        1, 
        web3.utils.fromAscii('EOS') 
      )
      .send({from: buyer});

    const balanceEOS = await dex.methods
      .balanceOf(
        buyer,
        web3.utils.fromAscii('EOS')
      )
      .call()

    const balanceOMG = await dex.methods
      .balanceOf(
        buyer,
        web3.utils.fromAscii('OMG')
      )
      .call()

    assert(parseInt(balanceEOS) === 11);
    assert(parseInt(balanceOMG) === 0);
  });
});

/*
contract('Dex', (accounts) => {
  before(async ()=> {
    dex = await artifactToWeb3(DEX, web3);
  });

  it('deposit() should increment sender balance', async () => {

    await dex.methods
      .deposit(
        5, 
        web3.utils.fromAscii('EOS') 
      )
      .send({from: buyer});

    const balanceEOS = await dex.methods
      .balanceOf(
        buyer,
        web3.utils.fromAscii('EOS')
      )
      .call()

    const balanceOMG = await dex.methods
      .balanceOf(
        buyer,
        web3.utils.fromAscii('OMG')
      )
      .call()

    assert(parseInt(balanceEOS) === 5);
    assert(parseInt(balanceOMG) === 0);
  });
});

/**
contract('Dex', (accounts) => {
  let weth, eos, omg;
  const admin = accounts[0];
  const buyer = accounts[4];
  const seller = accounts[5];
  let tokens = [];

const seedTokens = async () => {
}

const seedDex = async () => {
  let dex = new web3.eth.Contract(Dex.abi);

  dex = await dex
    .deploy({data: Dex.bytecode})
    .send({
      from: admin,
      gas: 3000000
    }); 

  //await dex
  //  .deploy({
  //    data: Dex.bytecode,
  //    arguments: [
  //      ['WETH', 'EOS', 'OMG']
  //        .map(ticker => web3.utils.asciiToHex(ticker)),
  //      [
  //        weth.options.address, 
  //        eos.options.address, 
  //        omg.options.address
  //      ]
  //    ]
  //  })
  //  .send({
  //    from: accounts[0],
  //    gas: 20000
  //  });
  //dex.options.address =;
  console.log(dex.options.address);

  await Promise.all(tokens.map(token => {  
    return dex.methods
      .addToken(
        web3.utils.fromAscii(token.ticker),
        token.at
      )
      .send({
        from: admin,
        gas: 200000
      }); 
  }));

  //Send tokens to buyer and sellers
  await Promise.all([
    weth.methods
      .transfer(buyer, 1000)
      .send({from: accounts[1]}),
    eos.methods
      .transfer(buyer, 1000), 
      .send({from: accounts[2]}),
    omg.methods
      .transfer(buyer, 1000)
      .send, {from: accounts[3]}),
    weth.methods
      .transfer(buyer, 1000)
      .send({from: accounts[1]}),
    eos.methods
      .transfer(buyer, 1000), 
      .send({from: accounts[2]}),
    omg.methods
      .transfer(buyer, 1000)
      .send, {from: accounts[3]}),
  ]);

  //Approve token transfers for Dex so that
  //Dex can do deposits. In the Dapp this will
  //be trigger by users from frontend
  await Promise.all([
    weth.methods
      .approve(dex.options.address, 1000)
      .send({from: buyer}),
    eos.methods
      .transfer(buyer, 1000), 
      .send({from: accounts[2]}),
    omg.methods
      .transfer(buyer, 1000)
      .send, {from: accounts[3]}),
    weth.methods
      .transfer(buyer, 1000)
      .send({from: accounts[1]}),
    eos.methods
      .transfer(buyer, 1000), 
      .send({from: accounts[2]}),
    omg.methods
      .transfer(buyer, 1000)
      .send, {from: accounts[3]}),
  ]);

  await dex.methods
    .deposit(
      10, 
      web3.utils.fromAscii('EOS') 
    )
    .send({from: buyer);

  //await dex.methods
  //  .deposit(
  //    5, 
  //    web3.utils.fromAscii('EOS')
  //  )
  //  .send({from: accounts[4]});

  //await dex.methods
  //  .deposit(
  //    11, 
  //    web3.utils.fromAscii('OMG')
  //  )
  //  .send({from: accounts[5]});

  //const balanceEOS4 = await dex.methods
  //  .balanceOf(
  //    accounts[4],
  //    web3.utils.fromAscii('EOS')
  //  )
  //  .call()

  //const balanceEOS5 = await dex.methods
  //  .balanceOf(
  //    accounts[5],
  //    web3.utils.fromAscii('EOS')
  //  )
  //  .call()

}

  before(async () => {
    //const dexTc = await Dex.deployed()
    const wethTc = await WETH.deployed()
    const eosTc = await EOS.deployed()
    const omgTc = await OMG.deployed()
    //dex = new web3.eth.Contract(Dex.abi, dexTc.address);
    weth = new web3.eth.Contract(WETH.abi, wethTc.address);
    eos = new web3.eth.Contract(EOS.abi, eosTc.address);
    omg = new web3.eth.Contract(OMG.abi, omgTc.address);
    tokens = [
      {ticker: 'WETH', at: weth.options.address},
      {ticker: 'EOS', at: eos.options.address},
      {ticker: 'OMG', at: omg.options.address}
    ];
  });


  it.skip('Deployment should pre-fund ERC20 tokens for accounts 3 & 4', async () => {
    const balances = [];
    const tokens = [eos, omg];
    const addresses = [accounts[3], accounts[4]];
    balances.push(await eos.balanceOf(accounts[3]));
    balances.push(await omg.balanceOf(accounts[3]));
    balances.push(await eos.balanceOf(accounts[4]));
    balances.push(await omg.balanceOf(accounts[4]));
    balances.map((balance) => assert.equal(balance.valueOf(), 1000));
  });

  it.skip('valueOf() should return an initial null token balance', async () => {
    const balances = await tokenBalances(dex, accounts);
    balances.map((balance) => assert.equal(balance.valueOf(), 0));
  });

  it.skip('deposit() should increment balance of sending address', async () => {

    const balanceOMG4 = await dex.methods
      .balanceOf(
        accounts[4],
        web3.utils.fromAscii('OMG')
      )
      .call()

    const balanceOMG5 = await dex.methods
      .balanceOf(
        accounts[5],
        web3.utils.fromAscii('OMG')
      )
      .call()

    assert(parseInt(balanceEOS4) === 15);
    assert(parseInt(balanceEOS5) === 0);
    assert(parseInt(balanceOMG4) === 0);
    assert(parseInt(balanceOMG5) === 11);
  });

  it('should add limit order', async () => {
    await seedDex();
    //await dex.addLimitOrder(
    //  'EOS',
    //  2,
    //  BUY_ORDER,
    //  {from: buyer}
    //);
    //const orders = await getOrders('EOS')
    //console.log(orders);
  });
});
**/
