const { expectRevert, time } = require('@openzeppelin/test-helpers'); 
const RockPaperScissors = artifacts.require('RockPaperScissors.sol');

contract('RockPaperScissors', (accounts) => {
  let contract;
  const [player1, player2] = [accounts[1], accounts[2]];
  const [salt1, salt2] = [10, 20];
  const [rock, paper, scissors] = [1, 2, 3]; 
  beforeEach(async () => {
    contract = await RockPaperScissors.new();
  });
  
  it('Should NOT create game if not ether sent', async () => {
  });

  it('Should create game', async () => {
  });

  it('Should NOT join game if not second player', async () => {
  });

  it('Should NOT join game if not enough ether sent', async () => {
  });

  it('Should NOT join game if not in CREATED state', async () => {
  });

  it('Should NOT commit move if game not in JOINED state', async () => {
  });

  it('Should NOT commit move if not called by player', async () => {
  });

  it('Should NOT commit move if move already made', async () => {
  });

  it('Should NOT commit move if non-existing move', async () => {
  });

  it('Should NOT reveal move if not in state COMMITED', async () => {
  });

  it('Should NOT reveal move if not in state COMMITED', async () => {
  });

  it('Should NOT reveal move if not in state COMMITED', async () => {
  });

  it('Should NOT reveal move if moveId does not match commitment', async () => {
  });

  it('Full game', async () => {
  });
});
