pragma solidity ^0.7.3;

interface CTokenInterface {
  function mint(uint mintAmount) external returns (uint);
  function redeem(uint redeemTokens) external returns (uint);
  function redeemUnderlying(uint redeemAmount) external returns (uint);
  function borrow(uint borrowAmount) external returns (uint);
  function repayBorrow(uint repayAmount) external returns (uint);
  function repayBorrowBehalf(address borrower, uint repayAmount) external returns (uint);
  function liquidateBorrow(address borrower, uint repayAmount, CTokenInterface cTokenCollateral) external returns (uint);
  function transfer(address dst, uint amount) external returns (bool);
  function transferFrom(address src, address dst, uint amount) external returns (bool);
  function approve(address spender, uint amount) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint);
  function balanceOf(address owner) external view returns (uint);
  function balanceOfUnderlying(address owner) external returns (uint);
  function getAccountSnapshot(address account) external view returns (uint, uint, uint, uint);
  function borrowRatePerBlock() external view returns (uint);
  function supplyRatePerBlock() external view returns (uint);
  function totalBorrowsCurrent() external returns (uint);
  function borrowBalanceCurrent(address account) external returns (uint);
  function borrowBalanceStored(address account) external view returns (uint);
  function exchangeRateCurrent() external returns (uint);
  function exchangeRateStored() external view returns (uint);
  function getCash() external view returns (uint);
  function accrueInterest() external returns (uint);
  function seize(address liquidator, address borrower, uint seizeTokens) external returns (uint);
  function underlying() external view returns(address);
}
