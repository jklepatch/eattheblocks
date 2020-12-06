pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './CTokenInterface.sol';
import './ComptrollerInterface.sol';
import './PriceOracleInterface.sol';

contract MyDeFiProject {
  ComptrollerInterface public comptroller;
  PriceOracle public priceOracle;

  constructor(
    address _comptroller,
    address _priceOracle
  ) {
    comptroller = ComptrollerInterface(_comptroller);
    priceOracle = PriceOracle.sol;
  }

  function supply(address cTokenAddress, uint underlyingAmount ) public {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    address underlyingAddress = cToken.underlying(); 
    IERC20(underlyingAddress).approve(address(cDai), underlyingAmount);
    cToken.mint(underlyingAmount);
  }

  function redeem(address cTokenAddress, uint cTokenAmount) external {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    uint redeemAmount;
    //if we dont specify any cTokenAmount, we redeem everything
    if(cTokenAmount == 0) {
      redeemAmount = cToken.balanceOf(address(this));  
    }
    cToken.redeem(redeemAmount);
  }

  function borrow(address cTokenAddress, uint supplyAmount, uint borrowAmount) external {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    address underlyingAddress = cToken.underlying(); 

    //provide some collateral
    supply(cTokenAddress, supplyAmount);

    //Indicate to Compound we can use DAI as collateral
    address[] memory markets = new address[](1);
    markets[0] = cTokenAddress; 
    comptroller.enterMarkets(markets);

    //Make sure we have enough collateral
    (uint256 error, uint256 liquidity, uint256 shortfall) = comptroller
      .getAccountLiquidity(address(this));
    if (error != 0) {
      revert("Comptroller.getAccountLiquidity failed.");
    }
    require(shortfall == 0, "account underwater");
    require(liquidity > 0, "account does not have collateral");
    uint256 underlyingPrice = priceFeed.getUnderlyingPrice(cTokenAddress);
    uint256 maxBorrowUnderlying = liquidity / underlyingPrice;
    require(borrowAmount <= maxBorrowUnderlying, 'not enough collateral');

    //Borrow
    cToken.borrow(borrowAmount);
  }

  function repayBorrow() external {
    bat.approve(address(cBat), 100);
    cBat.repayBorrow(100);
    //(optional, if you want to get back collateral)
    uint balance = cDai.balanceOf(address(this));  
    cDai.redeem(balance);
  }
}
