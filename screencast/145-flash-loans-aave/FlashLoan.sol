pragma solidity ^0.5.0;

import 'https://github.com/aave/aave-protocol/blob/master/contracts/configuration/LendingPoolAddressesProvider.sol';
import 'https://github.com/aave/aave-protocol/blob/master/contracts/lendingpool/LendingPool.sol';
import 'https://github.com/aave/aave-protocol/blob/master/contracts/flashloan/base/FlashLoanReceiverBase.sol';

contract Borrower is FlashLoanReceiverBase {
    LendingPoolAddressesProvider provider;
    address dai;
    
    constructor(
        address _provider, 
        address _dai) 
        FlashLoanReceiverBase(_provider)
        public {
        provider = LendingPoolAddressesProvider(_provider);
        dai = _dai;
    }
    
    function startLoan(uint amount, bytes calldata _params) external {
        LendingPool lendingPool = LendingPool(provider.getLendingPool());
        lendingPool.flashLoan(address(this), dai, amount, _params);
    }
    
    function executeOperation(
        address _reserve,
        uint _amount,
        uint _fee,
        bytes memory _params
    ) external {
        // arbitrage, refinance loan, change collateral of loan
        transferFundsBackToPoolInternal(_reserve, amount + fee);
    }
}
