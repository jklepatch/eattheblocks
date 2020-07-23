pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import { KyberNetworkProxy as IKyberNetworkProxy } from '@studydefi/money-legos/kyber/contracts/KyberNetworkProxy.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './IUniswapV2Router02.sol';
import './IWeth.sol';

contract TestArbitrage {
  IKyberNetworkProxy kyber;
  IUniswapV2Router02 uniswap;
  IWeth weth;
  IERC20 dai;
  address constant KYBER_ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

  constructor(
      address kyberAddress,
      address uniswapAddress,
      address wethAddress,
      address daiAddress
  ) public {
    kyber = IKyberNetworkProxy(kyberAddress);
    uniswap = IUniswapV2Router02(uniswapAddress);
    weth = IWeth(wethAddress);
    dai = IERC20(daiAddress);
  }

  function kyberToUniswap(uint daiAmount) external {
    dai.transferFrom(msg.sender, address(this), daiAmount);

    //Buy ETH on Kyber
    dai.approve(address(kyber), daiAmount); 
    (uint expectedRate, ) = kyber.getExpectedRate(
      dai, 
      IERC20(KYBER_ETH_ADDRESS), 
      daiAmount
    );
    kyber.swapTokenToEther(dai, daiAmount, expectedRate);

    //Sell ETH on Uniswap
    address[] memory path = new address[](2);
    path[0] = address(weth);
    path[1] = address(dai);
    uint[] memory minOuts = uniswap.getAmountsOut(address(this).balance, path); 
    uniswap.swapExactETHForTokens.value(address(this).balance)(
      minOuts[1], 
      path, 
      address(this), 
      now
    );
  }

  function uniswapToKyber(uint daiAmount) external {
    dai.transferFrom(msg.sender, address(this), daiAmount);

    //Buy ETH on Uniswap
    dai.approve(address(uniswap), daiAmount); 
    address[] memory path = new address[](2);
    path[0] = address(dai);
    path[1] = address(weth);
    uint[] memory minOuts = uniswap.getAmountsOut(daiAmount, path); 
    uniswap.swapExactTokensForETH(
      daiAmount, 
      minOuts[1],
      path, 
      address(this), 
      now
    );

    //Commented out because no liquidity on Kovan 
    /*
    //Sell ETH on Kyber
    (uint expectedRate, ) = kyber.getExpectedRate(
      IERC20(KYBER_ETH_ADDRESS), 
      dai, 
      address(this).balance
    );
    kyber.swapEtherToToken.value(address(this).balance)(
      dai, 
      expectedRate
    );
    */
  }

  function() external payable {}

}
