pragma solidity ^0.5.0;

contract Deed {
  address beneficiary;
  address laywer;
  uint amount;
  uint earliest;

  
  constructor(address _beneficiary, address _lawyer, uint _amount, uint fromNow) payable public {
    require(msg.value == _amount);
    beneficiary = _beneficiary; 
    laywer = _laywer;
    amount = _amount;
    earliest = now + fromNow;
  }

  function send() public {
    require(msg.sender == laywer && now > earliest);
    beneficiary.transfer(amount);
  }
}
