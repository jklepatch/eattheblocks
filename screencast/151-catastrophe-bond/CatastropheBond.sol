pragma solidity 0.6.3;

contract DisasterBond {
  enum Outcome { NONE, DISASTER_HAPPEN, DISASTER_NOT_HAPPEN }
  
  uint public principal;
  uint public coupon;
  address public oracle;
  address payable public sponsor;
  address payable public investor;
  uint public end;
  Outcome outcome;
  
  constructor(address _oracle, uint _principal, uint duration) public payable {
     oracle = _oracle;
     principal = _principal;
     coupon = msg.value;
     sponsor = msg.sender;
     end = now + duration;
  }
  
  function invest() external payable {
      require(investor == address(0), 'an investor already registered');
      require(msg.value == principal, 'not enough money sent');
      require(now < end, 'too late');
      investor = msg.sender;
      investor.transfer(coupon);
  }
  
  function reportOutcome(Outcome _outcome) external {
      require(msg.sender == oracle, 'only oracle');
      require(investor != address(0), 'no investor registered');
      require(now < end, 'too late');
      outcome = _outcome;
      
      if (_outcome == Outcome.DISASTER_HAPPEN) {
          sponsor.transfer(principal);
      } else {
          investor.transfer(principal);
      }
  }
}
