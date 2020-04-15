pragma solidity ^0.6.0;

interface ExchangeA {
    function priceForToken(address token) external view returns(uint);
    function enterTrade(address token, uint amount) external returns(uint);
}
