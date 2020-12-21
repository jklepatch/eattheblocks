pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './CTokenInterface.sol';
import './ComptrollerInterface.sol';
import './Weth.sol';
//import './PriceOracleInterface.sol';

contract Wallet {
  ComptrollerInterface public comptroller;
  Weth public weth;

  constructor(address _comptroller, address _weth) {
    comptroller = ComptrollerInterface(_comptroller);
    weth = Weth(_weth);
  }

  function deposit(address cTokenAddress, uint underlyingAmount) external {
    _investCompound(cTokenAddress, underlyingAmount);
    comptroller.claimComp(address(this));
  }

  function depositETH(address cTokenAddress) external payable {
    weth.deposit{value: msg.value}();
    _investCompound(cTokenAddress, msg.value);
    comptroller.claimComp(address(this));
  }

  function _investCompound(address cTokenAddress, uint underlyingAmount) internal {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    address underlyingAddress = cToken.underlying(); 
    IERC20 token = IERC20(underlyingAddress);
    token.transferFrom(msg.sender, address(this), underlyingAmount);
    token.approve(cTokenAddress, underlyingAmount);
    cToken.mint(underlyingAmount);
    comptroller.claimComp(address(this));
  }

  function withdraw(address cTokenAddress, uint cTokenAmount) external {
    CTokenInterface cToken = CTokenInterface(cTokenAddress);
    cToken.redeem(cTokenAmount);
    address underlyingAddress = cToken.underlying(); 
    IERC20 token = IERC20(underlyingAddress);
    uint underlyingAmount = token.balanceOf(address(this));
    token.transfer(msg.sender, underlyingAmount);
  }

  function getBalances(address[] memory cTokenAddresses) external returns(uint[] memory) {
    uint[] memory balances = new uint[](cTokenAddresses.length);
    for(uint i = 0; i < cTokenAddresses.length; i++) {
      balances[i] = CTokenInterface(cTokenAddresses[i]).balanceOfUnderlying(address(this)); 
    }
    return balances;
  }
}
