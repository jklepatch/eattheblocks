pragma solidity ^0.5.2;

contract Game {
    uint start;
    mapping(address => bool) participants;
    
    constructor() public {
        start = now;
    }
    
    function participate() payable external {
        require(participants[msg.sender] == false, 'same address cannot call participate more than once');
        require(msg.value == 1000, 'must send 1000 wei');
        require(now < start + 10 days, 'cannot participate 10 days after start of game');
        if(msg.value == 1000) {
            revert('1000 ether was sent');
        } else {
            revert('other amount was sent');
        }
        participants[msg.sender] = true;
    }
    
    function withdrawPrize() external {
        //withdraw prize logic...
    }
}
