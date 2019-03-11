pragma solidity ^0.5.4;

contract Fomo3D {
    enum State {
        INACTIVE,
        ACTIVE
    }
    State currentState = State.INACTIVE;
    address payable public king;
    uint public start;
    uint public end;
    uint public hardEnd;
    uint public pot;
    uint public initialKeyPrice;
    uint public totalKeys;
    address payable[] public keyHolders;
    mapping(address => uint) keys;
    
    function kickStart() 
        external 
        inState(State.INACTIVE) {
        currentState = State.ACTIVE;
        _createRound();
    }
        
    function _createRound() internal  {
        for(uint i = 0; i < keyHolders.length; i++) {
            delete keys[keyHolders[i]];
        }
        delete keyHolders;
        totalKeys = 0;
        start = now;
        end = now + 30;
        hardEnd = now + 86400;
        initialKeyPrice = 1 ether;
    }
    
    modifier inState(State state) {
        require(currentState == state, 'not possible in current state');
        _;
    }
}
