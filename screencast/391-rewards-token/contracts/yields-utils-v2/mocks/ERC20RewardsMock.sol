// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;
import "../token/ERC20Rewards.sol";


contract ERC20RewardsMock is ERC20Rewards  {

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        IERC20 rewardsToken
    ) ERC20Rewards(name, symbol, decimals, rewardsToken) { }

    /// @dev Give tokens to anyone.
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    /// @dev Burn tokens from anyone.
    function burn(address from, uint256 amount) public {
        _burn(from, amount);
    }

    /// @dev Update the rewards per token accumulator.
    function updateRewardsPerToken() public returns (uint128) {
        _updateRewardsPerToken();
        return rewardsPerToken.accumulated;
    }

    /// @dev Accumulate rewards for an user.
    function updateUserRewards(address user) public returns (uint128) {
        return _updateUserRewards(user);
    }
}
