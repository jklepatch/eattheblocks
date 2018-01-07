pragma solidity ^0.4.4;

contract Bet {
  uint betType;

  function Bet(uint _betType) {
    betType = _betType;
  }
}
contract MyBet is Bet {
  function MyBet(uint _betType) Bet(_betType) {
    // constructor
  }
}
