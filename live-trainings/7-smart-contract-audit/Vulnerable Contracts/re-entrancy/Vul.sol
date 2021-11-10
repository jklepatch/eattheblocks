pragma solidity ^0.6.6;

contract simpleReentrancy {
    
    mapping (address => uint) private balances;
    
    function deposit() public payable  {
        require((balances[msg.sender] + msg.value) >= balances[msg.sender]);
        balances[msg.sender] += msg.value;

    }

    function withdraw(uint withdrawAmount) public returns (uint) {
           	require(withdrawAmount <= balances[msg.sender]);
    		msg.sender.call.value(withdrawAmount)("");
    
    		balances[msg.sender] -= withdrawAmount;
    		return balances[msg.sender];
    }
    
    function getBalance() public view returns (uint){
        return balances[msg.sender];
    }
}