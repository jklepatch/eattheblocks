// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../token/ERC20Permit.sol";


contract ERC20Mock is ERC20Permit  {

    constructor(
        string memory name,
        string memory symbol
    ) ERC20Permit(name, symbol, 18) { }

    /// @dev Give tokens to whoever asks for them.
    function mint(address to, uint256 amount) public virtual {
        _mint(to, amount);
    }

    /// @dev Burn tokens from whoever.
    function burn(address from, uint256 amount) public virtual {
        _burn(from, amount);
    }
}
