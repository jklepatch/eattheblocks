pragma solidity ^0.5.4;

contract RockPaperScissors {
  enum State {
    CREATED,
    JOINED,
    COMMITED,
    REVEALED
  }  
  struct Game {
    uint id;
    uint bet;
    address payable[] players;
    State state;
  } 
  struct Move {
    bytes32 hash;
    uint value;
  }
  mapping(uint => Game) public games;
  mapping(uint => mapping(address => Move)) public moves;
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
  
  function commitMove(uint _gameId, uint moveId, uint salt) external {
    Game storage game = games[_gameId];
    require(game.state == State.JOINED, 'game must be in JOINED state');
    require(msg.sender == game.players[0] || msg.sender == game.players[1], 'can only be called by one of players');
    require(moves[_gameId][msg.sender].hash == 0, 'move already made'); // if no move yet, it will default to 0
    require(moveId == 1 || moveId == 2 || moveId == 3, 'move needs to be 1, 2 or 3');
    moves[_gameId][msg.sender] = Move(keccak256(abi.encodePacked(moveId, salt)), 0);
    if(moves[_gameId][game.players[0]].hash != 0 
      && moves[_gameId][game.players[1]].hash != 0) {
      game.state = State.COMMITED;    
    }
  }
}
