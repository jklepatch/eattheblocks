pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor() ERC20("Wrapped ETH", "WETH") public {}
    
    function mint() external payable {
        _mint(msg.sender, msg.value);
    }
    
    function burn(uint amount) external {
        msg.sender.transfer(amount);
        _burn(msg.sender, amount);
    }
}
