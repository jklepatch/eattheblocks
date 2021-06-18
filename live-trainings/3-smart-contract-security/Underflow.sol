pragma solidity ^0.5.2;

contract underflow 
{

    mapping (address=>uint) public balanceOf;

   function transfer(address _to, uint256 _value) public 
    {
        require(balanceOf[msg.sender] - _value >= 0);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }

    function put() public payable
    {
        balanceOf[msg.sender] += msg.value;
    }


} 
