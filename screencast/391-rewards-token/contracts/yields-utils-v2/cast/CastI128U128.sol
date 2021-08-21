// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;


library CastI128U128 {
    /// @dev Safely cast an int128 to an uint128
    function u128(int128 x) internal pure returns (uint128 y) {
        require (x >= 0, "Cast overflow");
        y = uint128(x);
    }
}