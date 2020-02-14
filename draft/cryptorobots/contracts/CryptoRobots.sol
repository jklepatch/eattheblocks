pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract CryptoRobots is ERC721Token("CryptoRobots", "CRPR"), Ownable {

  event RobotCreated(uint indexed robotId, uint64 attack, uint64 defense, uint64 power);
  event JoinedBattleground(uint indexed robotId);
  event LeftBattleground(uint indexed robotId);

  // 0.001 ether
  uint robotPrice = 1 finney;
  uint battleGroundPrice = 1 finney;

  struct Robot {
    uint64 attack;
    uint64 defense;
    uint64 power;
    uint64 magicFactor; //Only special robots created by the owner have this
    bool exists;
    bool inBattleground;
  }

  mapping (uint => Robot) public robots;
  mapping (uint => uint) public battlegroundLoot;

  uint public numRobots;
  uint public numSpecialRobots;

  uint public constant MAX_SPECIAL_ROBOTS = 100;

  function create() public payable {
    require(msg.value >= robotPrice, "User must pay the required price or more");
    
    _mint(msg.sender, numRobots);

    robots[numRobots] = Robot({
      attack: randomGen(100),
      defense: randomGen(100),
      power: randomGen(100),
      magicFactor: 0,
      exists: true,
      inBattleground: false
    });

    emit RobotCreated(numRobots, robots[numRobots].attack, robots[numRobots].defense, robots[numRobots].power, robots[numRobots].magicFactor);

    numRobots++;
  }

  function joinBattleGround(uint _robotId) public payable {
    require(msg.value >= battleGroundPrice, "User must pay the required price or more");
    require(ownerOf(_robotId) == msg.sender, "Caller has to be the owner of the robot he is using");
    require(!robots[_robotId].inBattleground, "Robot must not already be in the battleground");

    battlegroundLoot[_robotId] = msg.value;

    robots[_robotId].inBattleground = true;

    emit JoinedBattleground(_robotId);
  }

  function leaveBattleGround(uint _robotId) public {
    require(ownerOf(_robotId) == msg.sender, "Caller has to be the owner of the robot he is using");
    require(robots[_robotId].inBattleground, "Robot must be in the battleground");

    uint payedAmount = battlegroundLoot[_robotId];
    battlegroundLoot[_robotId] = 0;

    msg.sender.transfer(payedAmount);

    robots[_robotId].inBattleground = false;

    emit LeftBattleground(_robotId);
  }

  function battle(uint _attackerId, uint _defenderId) public {
    require(ownerOf(_attackerId) == msg.sender, "Caller has to be the owner of the robot he is using");
    require(robots[_defenderId].exists, "The robot you are attacking must exist");

    uint magicFactor = randomGen(5);

    uint winner = battleOut();

    // the attacker won
    if (winner == 0) {
       battlegroundLoot[_attackerId] += battlegroundLoot[_defenderId];
       battlegroundLoot[_defenderId] = 0;
    } else { // the defender won
       battlegroundLoot[_defenderId] += battlegroundLoot[_attackerId];
       battlegroundLoot[_attackerId] = 0;
    }

  }

  // ONLY OWNER METHODS

  function changePrice(uint _newPrice) public onlyOwner {
    price = _newPrice;
  }

  function createSpecialRobot() public onlyOwner {
    require(numSpecialRobots <= MAX_SPECIAL_ROBOTS, "Only MAX_SPECIAL_ROBOTS are ever allowed to exist");

     _mint(msg.sender, numRobots);

    robots[numRobots] = Robot({
      attack: randomGen(100),
      defense: randomGen(100),
      power: randomGen(100),
      magicFactor: randomGen(100),
      exists: true,
      inBattleground: false
    });

    RobotCreated(numRobots, robots[numRobots].attack, robots[numRobots].defense, robots[numRobots].power, robots[numRobots].magicFactor);

    numRobots++;
    numSpecialRobots++;
  }

  function randomGen(uint _max) constant internal returns (uint randomNumber) {
      return (uint(keccak256(block.hash, block.timestamp, numRobots)) % _max);
  }

  // Internal methods

  //TODO: build a simple algorithm of who wins the battle
  function battleOut() internal returns(uint) {
    return 0;
  }

}