pragma solidity ^0.6.0;

interface ExchangeB {
    function getPriceForToken(address token) external view returns(uint);
    function executeTrade(address token, uint amount) external returns(uint);
}
