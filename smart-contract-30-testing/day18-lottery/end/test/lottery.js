const Lottery = artifacts.require('Lottery');
const timeHelper = require('ganache-time-traveler');

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

const balances = async addresses => {
  const balanceResults = await Promise.all(addresses.map(address =>
    web3.eth.getBalance(address)
  ));
  return balanceResults.map(balance => web3.utils.toBN(balance));
};

contract('Lottery', (accounts) => {
  let lottery = null;
  let snapshotId = null;
  before(async () => {
    lottery = await Lottery.deployed();
    const snapShot = await timeHelper.takeSnapshot();
    snapshotId = snapShot['result'];
  });
  
  it('Should NOT create bet if not admin', async () => {
    await assertError(
      lottery.createBet(5, 5, {from: accounts[1]}),
      'only admin'
    );
  });

  it('Should NOT create bet if state not idle', async () => {
    await lottery.createBet(5, 5),
    await assertError(
      lottery.createBet(5, 5),
      'current state does not allow this'
    );
  });

  it('Should create a bet', async () => {
    await timeHelper.revertToSnapShot(snapshotId);
    const snapShot = await timeHelper.takeSnapshot();
    snapshotId = snapShot['result'];
    await lottery.createBet(10, 20);
    const betCount = await lottery.betCount();
    const betSize = await lottery.betSize();
    const currentState = await lottery.currentState();
    assert(betCount.toNumber() === 10);
    assert(betSize.toNumber() === 20);
    assert(currentState.toNumber() === 1);
  });

  it('Should NOT bet if not in state BETTING', async () => {
    await timeHelper.revertToSnapShot(snapshotId);
    await assertError( 
      lottery.bet({value: 100, from: accounts[1]}),
      'current state does not allow this'
    );
  });

  it('Should NOT bet if not sending exact bet amount', async () => {
    await timeHelper.revertToSnapShot(snapshotId);
    const snapShot = await timeHelper.takeSnapshot();
    snapshotId = snapShot['result'];
    await lottery.createBet(3, 20);
    await assertError( 
      lottery.bet({value: 100, from: accounts[1]}),
      'can only bet exactly the bet size'
    );
    await assertError( 
      lottery.bet({value: 15, from: accounts[2]}),
      'can only bet exactly the bet size'
    );
  });

  it('Should bet', async () => {
    const players = [accounts[1], accounts[2], accounts[3]];

    await timeHelper.revertToSnapShot(snapshotId);
    await lottery.createBet(3, web3.utils.toWei('1', 'ether'));

    const balancesBefore = await balances(players); 
    const txs = await Promise.all(players.map(player => lottery.bet({
      value: web3.utils.toWei('1', 'ether'), 
      from: player,
      gasPrice: 1
    })))
    const balancesAfter = await balances(players); 
    //const result = players.some((_player, i) => balancesBefore[i].sub(balancesAfter[i]).toNumber() ===  294);
    const result = players.some((_player, i) => {
      const gasUsed = web3.utils.toBN(txs[i].receipt.gasUsed);
      const expected = web3.utils.toBN(web3.utils.toWei('1.94', 'ether'));
      return balancesAfter[i].sub(balancesBefore[i]).add(gasUsed).eq(expected);
    });
    assert(result === true);
  });

  it('Should NOT cancel if not betting', async () => {
    await assertError(
      lottery.cancel({from: accounts[1]}),
      'current state does not allow this'
    );
  });

  it('Should NOT cancel if not admin', async () => {
    await lottery.createBet(3, 100);
    await assertError(
      lottery.cancel({from: accounts[1]}),
      'only admin'
    );
  });

  it('Should cancel', async () => {
    await lottery.cancel();
    const state = await lottery.currentState();
    assert(state.toNumber() === 0);
  });
});
