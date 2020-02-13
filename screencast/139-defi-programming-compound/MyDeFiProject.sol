pragma solidity ^0.5.12;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './CTokenInterface.sol';
import './ComptrollerInterface.sol';

contract MyDeFiProject {
  IERC20 dai;
  CTokenInterface cDai;
  IERC20 bat;
  CTokenInterface cBat;
  ComptrollerInterface comptroller;

  constructor(
    address _dai, 
    address _cDai, 
    address _bat,
    address _cBat,
    address _comptroller) public {
    dai = IERC20(_dai);
    cDai = CTokenInterface(_cDai);
    bat = IERC20(_bat);
    cBat = CTokenInterface(_cBat); 
    comptroller = ComptrollerInterface(_comptroller);
  }

  function invest() external {
    dai.approve(address(cDai), 10000);
    cDai.mint(10000);
  }

  function cashOut() external {
    uint balance = cDai.balanceOf(address(this));  
    cDai.redeem(balance);
  }

  function borrow() external {
    //Create cDai
    dai.approve(address(cDai), 10000);
    cDai.mint(10000);

    //Include cDai in compound collateral
    address[] memory markets = new address[](1);
    markets[0] = address(cDai);
    comptroller.enterMarkets(markets);

    //create loan
    cBat.borrow(100);
  }

  function payBack() external {
    bat.approve(address(cBat), 100);
    cBat.repayBorrow(100);
    //(optional, if you want to get back collateral)
    uint balance = cDai.balanceOf(address(this));  
    cDai.redeem(balance);
  }
}
