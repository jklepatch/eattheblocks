pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import { KyberNetworkProxy as IKyberNetworkProxy } from '@studydefi/money-legos/kyber/contracts/KyberNetworkProxy.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './IUniswapV2Router02.sol';
import './IWeth.sol';

contract TestArbitrage {
  //event NewArbitrage (
  //  Direction direction,
  //  uint profit,
  //  uint date
  //);

  IKyberNetworkProxy kyber;
  IUniswapV2Router02 uniswap;
  IWeth weth;
  IERC20 dai;
  address beneficiary;
  address constant KYBER_ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

  event Foo(uint balanceDai, uint repayAmount);

  constructor(
      address kyberAddress,
      address uniswapAddress,
      address wethAddress,
      address daiAddress,
      address beneficiaryAddress
  ) public {
    kyber = IKyberNetworkProxy(kyberAddress);
    uniswap = IUniswapV2Router02(uniswapAddress);
    weth = IWeth(wethAddress);
    dai = IERC20(daiAddress);
    beneficiary = beneficiaryAddress;
  }

  function kyberToUniswap(uint daiAmount) external {
    dai.transferFrom(msg.sender, address(this), daiAmount);
    uint balanceDai = dai.balanceOf(address(this));

    //Buy ETH on Kyber
    dai.approve(address(kyber), balanceDai); 
    (uint expectedRate, ) = kyber.getExpectedRate(
      dai, 
      IERC20(KYBER_ETH_ADDRESS), 
      balanceDai
    );
    kyber.swapTokenToEther(dai, balanceDai, expectedRate);
    /*

    //Sell ETH on Uniswap
    address[] memory path = new address[](2);
    path[0] = address(weth);
    path[1] = address(dai);
    uint[] memory minOuts = uniswap.getAmountsOut(address(this).balance, path); 
    uniswap.swapExactETHForTokens.value(address(this).balance)(
      minOuts[0], 
      path, 
      address(this), 
      now
    );
    */
  }

  function uniswapToKyber(uint daiAmount) external {
    dai.transferFrom(msg.sender, address(this), daiAmount);
    uint balanceDai = dai.balanceOf(address(this));
    //Buy ETH on Uniswap
    dai.approve(address(uniswap), balanceDai); 
    address[] memory path = new address[](2);
    path[0] = address(dai);
    path[1] = address(weth);
    uint[] memory minOuts = uniswap.getAmountsOut(balanceDai, path); 
    uniswap.swapExactTokensForETH(
      balanceDai, 
      minOuts[0], 
      path, 
      address(this), 
      now
    );

    //Sell ETH on Kyber
    (uint expectedRate, ) = kyber.getExpectedRate(
      IERC20(KYBER_ETH_ADDRESS), 
      dai, 
      address(this).balance - 2
    );
    kyber.swapEtherToToken.value(address(this).balance - 2)(
      dai, 
      expectedRate
    );
  }
}
