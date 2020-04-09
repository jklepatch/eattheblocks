pragma solidity ^0.6.0;

import "./Token.sol";
import "./Registry.sol";

contract B {
    Registry registry;
    address admin;
    
    constructor() public {
        admin = msg.sender;
    }
    
    function updateRegistry(address registryAddress) external {
        require(msg.sender == admin);
        registry  = Registry(registryAddress);
    }

    function foo() external {
        Token token = Token(registry.tokens("ABC"));
        token.transfer(100, msg.sender);
    }
}
