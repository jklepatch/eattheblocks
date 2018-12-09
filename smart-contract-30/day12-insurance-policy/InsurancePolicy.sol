pragma solidity ^0.5.0;

contract InsurancePolicy {
  address beneficiary;
  address laywer;
  uint amount;
  uint earliest;
  struct Payout {
    uint date;
    uint amount;
  }

  
  constructor(address _beneficiary, address _lawyer, uint terms, uint _amount, uint fromNow) payable public {
    require(msg.value == _amount);
    beneficiary = _beneficiary; 
    laywer = _laywer;
    amount = _amount;
    earliest = now + fromNow;
  }

  function send() public {
    require(msg.sender == laywer && now > earliest);
    active = true;payable
    beneficiary.transfer(amount);
  }
}
