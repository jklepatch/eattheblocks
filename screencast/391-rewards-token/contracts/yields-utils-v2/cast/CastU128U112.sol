// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;


library CastU128U112 {
    /// @dev Safely cast an uint128 to an uint112
    function u112(uint128 x) internal pure returns (uint112 y) {
        require (x <= uint128(type(uint112).max), "Cast overflow");
        y = uint112(x);
    }
}