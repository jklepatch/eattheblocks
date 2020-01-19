const { expectRevert } = require('@openzeppelin/test-helpers');
const Game = artifacts.require('Cryptokitty.sol');

contract('Game', accounts => {
  let game;
  const [admin, player1] = [accounts[0], accounts[1]];

  beforeEach(async () => {
    game = await Game.new('https://url-to-your-game-server');
  });

  it('should NOT mint if not admin', async () => {
  });

  it('should mint if admin', async () => {
  });

  it('should breed', async () => {
  });
});
