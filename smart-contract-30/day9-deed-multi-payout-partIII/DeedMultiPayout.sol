pragma solidity ^0.5.0;

contract DeedMultiPayout {
  address public lawyer;
  address payable public beneficiary;
  uint public earliest;
  uint public amount;
  uint constant public PAYOUTS = 10;
  uint constant public INTERVAL = 10;
  uint public paidPayouts;
  
  constructor(
    address _lawyer,
    address payable _beneficiary,
    uint fromNow)
    payable
    public {
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        earliest = now + fromNow;
        amount = msg.value / PAYOUTS;
    }
  
  function withdraw() public {
    require(msg.sender == beneficiary, 'beneficiary only');
    require(now >= earliest, 'too early');
    require(paidPayouts < PAYOUTS);
    
    uint elligiblePayouts = (now - earliest) / INTERVAL;
    uint duePayouts = elligiblePayouts - paidPayouts;
    duePayouts = duePayouts + paidPayouts > PAYOUTS ? PAYOUTS - paidPayouts : duePayouts;
    paidPayouts += duePayouts;
    beneficiary.transfer(duePayouts * amount);
  }
}
