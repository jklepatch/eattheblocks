pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './ComptrollerInterface.sol';
import './CTokenInterface.sol';

contract YieldFarmer {
  ComptrollerInterface public comptroller;
  CTokenInterface public cDai;
  IERC20 public dai;
  uint borrowFactor = 70;

  constructor(
    address comptrollerAddress,
    address cDaiAddress,
    address daiAddress
  ) {
    comptroller = ComptrollerInterface(comptrollerAddress);
    cDai = CTokenInterface(cDaiAddress);
    dai = IERC20(daiAddress);
    address[] memory cTokens = new address[](1);
    cTokens[0] = cDaiAddress; 
    comptroller.enterMarkets(cTokens);
  }

  function openPosition(uint initialAmount) external {
    uint nextCollateralAmount = initialAmount;
    for(uint i = 0; i < 5; i++) {
      nextCollateralAmount = _supplyAndBorrow(nextCollateralAmount);
    }
  }

  function _supplyAndBorrow(uint collateralAmount) internal returns(uint) {
    dai.approve(address(cDai), collateralAmount);
    cDai.mint(collateralAmount);
    uint borrowAmount = (collateralAmount * 70) / 100;
    cDai.borrow(borrowAmount);
    return borrowAmount;
  }

  function closePosition() external {
    uint balanceBorrow = cDai.borrowBalanceCurrent(address(this));
    dai.approve(address(cDai), balanceBorrow);
    cDai.repayBorrow(balanceBorrow);
    uint balancecDai = cDai.balanceOf(address(this));
    cDai.redeem(balancecDai);
  }
}
