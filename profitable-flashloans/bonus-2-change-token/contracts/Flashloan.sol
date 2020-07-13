pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "@studydefi/money-legos/dydx/contracts/DydxFlashloanBase.sol";
import "@studydefi/money-legos/dydx/contracts/ICallee.sol";
import { KyberNetworkProxy as IKyberNetworkProxy } from '@studydefi/money-legos/kyber/contracts/KyberNetworkProxy.sol';

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import './IUniswapV2Router02.sol';
import './IWeth.sol';

contract Flashloan is ICallee, DydxFlashloanBase {
    enum Direction { KyberToUniswap, UniswapToKyber } 
    struct ArbInfo {
        Direction direction;
        uint repayAmount;
    }

    event NewArbitrage (
      Direction direction,
      uint profit,
      uint date
    );

    IKyberNetworkProxy kyber;
    IUniswapV2Router02 uniswap;
    IWeth weth;
    IERC20 token;
    address beneficiary;
    address constant KYBER_ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    constructor(
        address kyberAddress,
        address uniswapAddress,
        address wethAddress,
        address tokenAddress,
        address beneficiaryAddress
    ) public {
      kyber = IKyberNetworkProxy(kyberAddress);
      uniswap = IUniswapV2Router02(uniswapAddress);
      weth = IWeth(wethAddress);
      token = IERC20(tokenAddress);
      beneficiary = beneficiaryAddress;
    }

    // This is the function that will be called postLoan
    // i.e. Encode the logic to handle your flashloaned funds here
    function callFunction(
        address sender,
        Account.Info memory account,
        bytes memory data
    ) public {
        ArbInfo memory arbInfo = abi.decode(data, (ArbInfo));
        uint256 balanceToken = token.balanceOf(address(this));

        // Note that you can ignore the line below
        // if your dydx account (this contract in this case)
        // has deposited at least ~2 Wei of assets into the account
        // to balance out the collaterization ratio
        require(
            balanceToken >= arbInfo.repayAmount,
            "Not enough funds to repay dydx loan!"
        );

        if(arbInfo.direction == Direction.KyberToUniswap) {
          //Buy ETH on Kyber
          token.approve(address(kyber), balanceToken); 
          (uint expectedRate, ) = kyber.getExpectedRate(
            token, 
            IERC20(KYBER_ETH_ADDRESS), 
            balanceToken
          );
          kyber.swapTokenToEther(token, balanceToken, expectedRate);

          //Sell ETH on Uniswap
          address[] memory path = new address[](2);
          path[0] = address(weth);
          path[1] = address(token);
          uint[] memory minOuts = uniswap.getAmountsOut(address(this).balance - 2, path); 
          uniswap.swapExactETHForTokens.value(address(this).balance - 2)(
            minOuts[0], 
            path, 
            address(this), 
            now
          );
        } else {
          //Buy ETH on Uniswap
          token.approve(address(uniswap), balanceToken); 
          address[] memory path = new address[](2);
          path[0] = address(token);
          path[1] = address(weth);
          uint[] memory minOuts = uniswap.getAmountsOut(balanceToken, path); 
          uniswap.swapExactTokensForETH(
            balanceToken, 
            minOuts[0], 
            path, 
            address(this), 
            now
          );

          //Sell ETH on Kyber
          (uint expectedRate, ) = kyber.getExpectedRate(
            IERC20(KYBER_ETH_ADDRESS), 
            token, 
            address(this).balance
          );
          kyber.swapEtherToToken.value(address(this).balance)(
            token, 
            expectedRate
          );
        }
        uint profit = token.balanceOf(address(this)) - arbInfo.repayAmount; 
        token.transfer(beneficiary, profit);
        emit NewArbitrage(arbInfo.direction, profit, now);
    }

    function initiateFlashloan(
      address _solo, 
      address _token, 
      uint256 _amount, 
      Direction _direction)
        external
    {
        ISoloMargin solo = ISoloMargin(_solo);

        // Get marketId from token address
        uint256 marketId = _getMarketIdFromTokenAddress(_solo, _token);

        // Calculate repay amount (_amount + (2 wei))
        // Approve transfer from
        uint256 repayAmount = _getRepaymentAmountInternal(_amount);
        IERC20(_token).approve(_solo, repayAmount);

        // 1. Withdraw $
        // 2. Call callFunction(...)
        // 3. Deposit back $
        Actions.ActionArgs[] memory operations = new Actions.ActionArgs[](3);

        operations[0] = _getWithdrawAction(marketId, _amount);
        operations[1] = _getCallAction(
            // Encode MyCustomData for callFunction
            abi.encode(ArbInfo({direction: _direction, repayAmount: repayAmount}))
        );
        operations[2] = _getDepositAction(marketId, repayAmount);

        Account.Info[] memory accountInfos = new Account.Info[](1);
        accountInfos[0] = _getAccountInfo();

        solo.operate(accountInfos, operations);
    }
}
