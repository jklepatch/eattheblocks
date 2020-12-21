pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './CTokenInterface.sol';
import './ComptrollerInterface.sol';
import './PriceOracleInterface.sol';

contract MyDeFiProject {
  ComptrollerInterface public comptroller;
  PriceOracleInterface public priceOracle;

  constructor(
    address _comptroller,
    address _priceOracle
  ) {
    comptroller = ComptrollerInterface(_comptroller);
    priceOracle = PriceOracleInterface(_priceOracle);
  }

  function supply(address cTokenAddress, uint underlyingAmount ) public {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    address underlyingAddress = cToken.underlying(); 
    IERC20(underlyingAddress).approve(cTokenAddress, underlyingAmount);
    uint result = cToken.mint(underlyingAmount);
    require(
      result == 0, 
      'cToken#mint() failed. see Compound ErrorReporter.sol for details'
    );
  }

  function redeem(address cTokenAddress, uint cTokenAmount) external {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    uint result = cToken.redeem(cTokenAmount);
    require(
      result == 0,
      'cToken#redeem() failed. see Compound ErrorReporter.sol for more details'
    );
  }

  function enterMarket(address cTokenAddress) external {
    address[] memory markets = new address[](1);
    markets[0] = cTokenAddress; 
    uint[] memory results = comptroller.enterMarkets(markets);
    require(
      results[0] == 0, 
      'comptroller#enterMarket() failed. see Compound ErrorReporter.sol for details'
    ); 
  }

  function borrow(address cTokenAddress, uint borrowAmount) external {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    address underlyingAddress = cToken.underlying(); 
    uint result = cToken.borrow(borrowAmount);
    require(
      result == 0, 
      'cToken#borrow() failed. see Compound ErrorReporter.sol for details'
    ); 
  }

  function repayBorrow(address cTokenAddress, uint underlyingAmount) external {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    address underlyingAddress = cToken.underlying(); 
    IERC20(underlyingAddress).approve(cTokenAddress, underlyingAmount);
    uint result = cToken.repayBorrow(underlyingAmount);
    require(
      result == 0, 
      'cToken#borrow() failed. see Compound ErrorReporter.sol for details'
    ); 
  }

  function getMaxBorrow(address cTokenAddress) external view returns(uint) {
    (uint result, uint liquidity, uint shortfall) = comptroller
      .getAccountLiquidity(address(this));
    require(
      result == 0, 
      'comptroller#getAccountLiquidity() failed. see Compound ErrorReporter.sol for details'
    ); 
    require(shortfall == 0, 'account underwater');
    require(liquidity > 0, 'account does not have collateral');
    uint underlyingPrice = priceOracle.getUnderlyingPrice(cTokenAddress);
    return liquidity / underlyingPrice;
  }

}
