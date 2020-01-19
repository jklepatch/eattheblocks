const { expectRevert } = require('@openzeppelin/test-helpers');
const Game = artifacts.require('Cryptokitty.sol');

contract('Game', accounts => {
  let game;
  const [admin, player1] = [accounts[0], accounts[1]];

  beforeEach(async () => {
    game = await Game.new('https://url-to-your-game-server');
  });

  it('should NOT mint if not admin', async () => {
    await expectRevert(
      game.mint({from: player1}), 
      'only admin'
    );
  });

  it('should mint if admin', async () => {
    await game.mint();
    await game.mint();

    const owner1 = await game.ownerOf(0);
    const owner2 = await game.ownerOf(1);
    assert(owner1 === admin);
    assert(owner2 === admin);

    const nextId = await game.nextId.call(); 
    assert(nextId.toNumber() === 2);

    const kitty1 = await game.kitties.call(0); 
    assert(kitty1.id.toNumber() === 0);
    assert(kitty1.generation.toNumber() === 1);

    const kitty2 = await game.kitties.call(1); 
    assert(kitty2.id.toNumber() === 1);
    assert(kitty2.generation.toNumber() === 1);
  });

  it('should breed', async () => {
    await game.mint();
    await game.mint();
    await game.breed(0, 1);

    const nextId = await game.nextId.call(); 
    assert(nextId.toNumber() === 3);

    const kitty3 = await game.kitties.call(2); 
    assert(kitty3.id.toNumber() === 2);
    assert(kitty3.generation.toNumber() === 2);

    const owner3 = await game.ownerOf(2);
    assert(owner3 === admin);
  });
});
