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
    
    function bet() 
        external 
        payable 
        inState(State.BETTING) {
        require(msg.value == betSize, 'can only bet exactly the bet size');
        players.push(msg.sender);
        if(players.length == betCount ) {
            uint winner = _randomModulo(betCount);
            players[winner].transfer((betSize * betCount) * (100 - houseFee) / 100);
            currentState = State.IDLE;
            delete players;
        }
    }
    
    function cancel() 
        external 
        inState(State.BETTING) 
        onlyAdmin() {
        for(uint i = 0; i < players.length; i++) {
            players[i].transfer(betSize);
        }
        delete players;
        currentState = State.IDLE;
    }
    
    function _randomModulo(uint modulo) view internal returns(uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % modulo;
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
