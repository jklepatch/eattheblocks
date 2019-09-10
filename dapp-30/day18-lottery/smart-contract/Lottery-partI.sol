pragma solidity ^0.5.4;

contract Lottery {
    enum State {
        IDLE,
        BETTING
    }
    address payable[] public players;
    State public currentState = State.IDLE;
    uint public betCount;
    uint public betSize;
    uint public houseFee;
    address public admin;
    
    constructor(uint fee) public {
        require(fee > 1 && fee < 99, 'fee should be between 1 and 99');
        admin = msg.sender;
        houseFee = fee;
    }
    
    function createBet(uint count, uint size) 
        external 
        inState(State.IDLE) 
        onlyAdmin() {
        betCount = count;
        betSize = size;
        currentState = State.BETTING;
    }

    modifier inState(State state) {
        require(state == currentState, 'current state does not allow this');
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin');
        _;
    }
}
