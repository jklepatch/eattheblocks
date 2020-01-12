pragma solidity ^0.5.0;

import '@openzeppelin/contracts/crowdsale/Crowdsale.sol';
import '@openzeppelin/contracts/crowdsale/distribution/PostDeliveryCrowdsale.sol';
import '@openzeppelin/contracts/crowdsale/time/IncreasingPriceCrowdsale.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract ICO is Crowdsale, PostDeliveryCrowdsale, IncreasingPriceCrowdsale {
  constructor(
    uint rate,
    address payable wallet,
    IERC20 token
  ) Crowdsale(rate, wallet, token) PostDeliveryCrowdsale() IncreasingPriceCrowdsale(3, 1) public {}
}
