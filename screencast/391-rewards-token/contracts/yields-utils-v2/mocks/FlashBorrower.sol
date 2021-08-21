// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../token/IERC20.sol";
import "erc3156/contracts/interfaces/IERC3156FlashBorrower.sol";
import "erc3156/contracts/interfaces/IERC3156FlashLender.sol";


contract FlashBorrower is IERC3156FlashBorrower {
    enum Action {NORMAL, TRANSFER, STEAL, REENTER, APPROVE}

    IERC3156FlashLender public lender;

    uint256 public flashBalance;
    address public flashInitiator;
    address public flashToken;
    uint256 public flashAmount;
    uint256 public flashFee;

    constructor (IERC3156FlashLender lender_) {
        lender = lender_;
    }

    /// @dev ERC-3156 Flash loan callback
    function onFlashLoan(address initiator, address token, uint256 amount, uint256 fee, bytes calldata data) external override returns(bytes32) {
        require(msg.sender == address(lender), "FlashBorrower: Untrusted lender");
        (Action action) = abi.decode(data, (Action)); // Use this to unpack arbitrary data
        flashInitiator = initiator;
        flashToken = token;
        flashAmount = amount;
        flashFee = fee;
        if (action == Action.NORMAL) {
            flashBalance = IERC20(token).balanceOf(address(this));
        } else if (action == Action.TRANSFER) {
            flashBalance = IERC20(token).balanceOf(address(this));
            IERC20(token).transfer(address(lender), amount + fee);
        } else if (action == Action.STEAL) {
            IERC20(token).transfer(address(0), amount);
        } else if (action == Action.REENTER) {    
            flashBorrow(token, amount * 2, Action.NORMAL);
        }
        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }

    function flashBorrow(address token, uint256 amount, Action action) public {
        bytes memory data = abi.encode(action);
        uint256 allowance = IERC20(token).allowance(address(this), address(lender));
        IERC20(token).approve(address(lender), allowance + amount + lender.flashFee(token, amount));
        lender.flashLoan(this, token, amount, data);
    }
}
