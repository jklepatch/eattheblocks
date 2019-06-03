pragma solidity ^0.5.8;

contract Dex {
    mapping(string => uint) public prices;
    
    function getPrice(string calldata _sticker) view external returns(uint) {
        return prices[_sticker];
    }
    
    function buy(string calldata _sticker, uint _amount, uint _price) external {
        //buy logic here
    }
    
    function sell(string calldata _sticker, uint _amount, uint _price) external {
        //sell logic here
    }
}
