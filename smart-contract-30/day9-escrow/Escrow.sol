pragma solidity ^0.5.0;

contract Escrow{
  address thirdParty;
  address payer;
  address payee;
  uint price;
  
  constructor(address _thirdParty, address _payer, address _payee, uint _price) public  {
      thirdParty = _thirdParty; 
      payer = _payer;
      payee = _payee;
      price = _price;
  }

  function deposit() payable public {
    require(msg.sender = payer);
    require(this.value + msg.value <= price);
  }

  function release() public {
    require(msg.sender = thirdParty);
    payee.transfer(price);
  }
}
