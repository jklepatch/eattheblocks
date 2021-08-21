// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.0;


library WMulUp { // Fixed point arithmetic in 18 decimal units
    // Taken from https://github.com/usmfum/USM/blob/master/contracts/WadMath.sol
    /// @dev Multiply x and y, with y being fixed point. If both are integers, the result is a fixed point factor. Rounds up.
    function wmulup(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = x * y + 1e18 - 1;        // Rounds up.  So (again imagining 2 decimal places):
        unchecked { z /= 1e18; }     // 383 (3.83) * 235 (2.35) -> 90005 (9.0005), + 99 (0.0099) -> 90104, / 100 -> 901 (9.01).
    }
}