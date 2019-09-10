pragma solidity ^0.5.4;

contract RockPaperScissors {
  enum State {
    CREATED,
    JOINED
  }  
  struct Game {
    uint id;
    uint bet;
    address payable[] players;
    State state;
  } 
  mapping(uint => Game) public games;
  uint public gameId;
  
  function createGame(address payable participant) external payable {
    require(msg.value > 0, 'have to send some ether');
    address payable[] memory players = new address payable[](2);
    players[0] = msg.sender;
    players[1] = participant;

    games[gameId] = Game(
      gameId, 
      msg.value,
      players,
      State.CREATED
    );
    gameId++;
  }
  
  function joinGame(uint _gameId) external payable {
    Game storage game = games[_gameId];
    require(msg.sender == game.players[1], 'sender must be second player'); //also throw if game does not exist
    require(msg.value >= game.bet, 'not enough ether sent');
    require(game.state == State.CREATED, 'game must be in CREATED state');
    if(msg.value > game.bet) {
      msg.sender.transfer(msg.value - game.bet);
    }
    game.state = State.JOINED;
  }
}
