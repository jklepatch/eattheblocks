pragma solidity ^0.6.0;

import "./ExchangeA.sol";
import "./ExchangeB.sol";

contract Adapter {
    ExchangeA exchangeA;
    ExchangeB exchangeB;
    
    constructor(address exchangeAAddress, address exchangeBAddress) public {
        exchangeA = ExchangeA(exchangeAAddress);
        exchangeB = ExchangeB(exchangeBAddress);
    }
    
    function getBestExchangeFor(address token) external view returns(address) {
        uint priceA = exchangeA.priceForToken(token);
        uint priceB = exchangeB.getPriceForToken(token);
        return priceA > priceB ? address(exchangeB) : address(exchangeA);
    }
    
    function invest(uint amount, address token, address exchange) external {
        if(exchange == address(exchangeA)) {
            exchangeA.enterTrade(token, amount);
        } else {
            exchangeB.executeTrade(token, amount);
        }
    }
}
