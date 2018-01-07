pragma solidity ^0.4.4;

contract Bet {
  uint betType;

  function Bet(uint _betType) {
    betType = _betType;
  }

  function betForThreePeople(address ppl1, address ppl2) isBetForTwoPeople() {
    //Perform bet here
  }

  modifier isBetForTwoPeople() {
    require(betType == 1);
    _;
  }
}

contract MyBet is Bet(2) {

  function MyBet(uint _betType) {
    //do other things
  }

  function whatsMyBetType() returns(uint) {
    return Bet.betType;
  }
}
