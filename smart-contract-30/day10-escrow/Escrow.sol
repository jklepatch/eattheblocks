pragma solidity ^0.5.0;

contract Escrow{
  address public thirdParty;
  address public payer;
  address payable public payee;
  uint public amount;
  
  constructor(
    address _payer, 
    address payable _payee, 
    uint _amount) 
    public {
    thirdParty = msg.sender; 
    payer = _payer;
    payee = _payee;
    amount = _amount;
  }

  function deposit() payable public only(payer) {
    require(address(this).balance <= amount, 'Cant send more than escrow amount');
  }

  function release() public only(thirdParty) {
    require(address(this).balance == amount, 'Cant release before all money received');
    payee.transfer(amount);
  }
  
  function balanceOf() view public returns(uint) {
    return address(this).balance;
  }
  
  modifier only(address _payer) {
    require(msg.sender == _payer, 'unauthorized sender');
     _;
  }
}
