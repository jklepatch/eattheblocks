pragma solidity ^0.5.2;

contract StateMachine {
  enum State {
    PENDING,
    ACTIVE,
    CLOSED
  }
  State public state = State.PENDING;
  uint public amount;
  uint public interest;
  uint public end;
  uint public duration;
  address payable public  borrower;
  address payable public lender;

  constructor(
    uint _amount, 
    uint _interest, 
    uint _duration,
    address payable _borrower, 
    address payable _lender) 
    public {
      amount = _amount;
      interest = _interest;
      duration = _duration;
      borrower = _borrower;
      lender = _lender;
  }

  function fund() payable external isPending() {
    require(msg.sender == lender, 'only lender can lend');
    require(address(this).balance == amount, 'cannot lend the exact amount');
    _transitionTo(State.ACTIVE);
    borrower.transfer(amount);
  }

  function reimburse() payable external isActive() {
    require(msg.sender == borrower, 'only borrower can pay interest');
    require(msg.value == amount + interest, 'can only reimburse exact amount + interest');
    require(now >= end, 'loan hasnt matured yet');
    _transitionTo(State.CLOSED);
    lender.transfer(amount + interest);
  }

  function _transitionTo(State to) internal {
    require(to != State.PENDING, 'cannot go back to pending');
    require(to != state, 'cannot transition to same state');
    if(to == State.ACTIVE) {
      require(state == State.PENDING, 'cannot only go to active from pending');
      state = State.ACTIVE;
      end = now + duration;
    }
    if(to == State.CLOSED) {
      require(state == State.ACTIVE, 'cannot only go to closed from active');
      state = State.CLOSED;
    }
  }

  modifier isPending() {
    require(state == State.PENDING, 'must be pending');
    _;
  }
  modifier isActive() {
    require(state == State.ACTIVE, 'must be active');
    _;
  }
  modifier isClosed() {
    require(state == State.CLOSED, 'must be close');
    _;
  }
}
