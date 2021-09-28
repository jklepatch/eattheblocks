// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address _to, uint256 _value) external returns (bool success);
}

interface IERC3156FlashBorrower {
    /**
     * @dev Receive a flash loan.
     * @param initiator The initiator of the loan.
     * @param token The loan currency.
     * @param amount The amount of tokens lent.
     * @param fee The additional amount of tokens to repay.
     * @param data Arbitrary data structure, intended to contain user-defined parameters.
     * @return The keccak256 hash of "ERC3156FlashBorrower.onFlashLoan"
     */
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external returns (bytes32);
}

interface IERC3156FlashLender {
   function flashLoan(
        IERC3156FlashBorrower receiver,
        address token,
        uint256 amount,
        bytes calldata data
    ) external returns (bool);
}

/*
*  FlashBorrowerExample is a simple smart contract that enables
*  to borrow and returns a flash loan.
*/
contract FlashloanBorrower is IERC3156FlashBorrower {
    uint public MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    address public admin;

    constructor() {
      admin = msg.sender;
    }

    //For `flashloanProviderAddress, search for FlashLoanProvider here:
    //https://docs.equalizer.finance/equalizer-deep-dive/smart-contracts
    function initiateFlashloan(
      address flashloanProviderAddress, 
      address token, 
      uint amount, 
      bytes calldata data
    ) external {
      IERC3156FlashLender(flashloanProviderAddress).flashLoan(
        IERC3156FlashBorrower(address(this)),
        token,
        amount,
        data
      );
    }

    // @dev ERC-3156 Flash loan callback
    function onFlashLoan(
        address initiator,
        address token,
        uint256 amount,
        uint256 fee,
        bytes calldata data
    ) external override returns (bytes32) {
        
        // Set the allowance to payback the flash loan
        IERC20(token).approve(msg.sender, MAX_INT);
        
        // Build your trading business logic here
        // e.g., sell on uniswapv2
        // e.g., buy on uniswapv3

        // Return success to the lender, he will transfer get the funds back if allowance is set accordingly
        return keccak256('ERC3156FlashBorrower.onFlashLoan');
    }

    function withdraw(address recipient, address token, uint amount) external {
      require(msg.sender == admin, 'only admin');
      IERC20(token).transfer(recipient, amount);
    }
}
