pragma solidity =0.6.6;
pragma experimental ABIEncoderV2;





import './utils/SafeMath.sol';
import './UniswapV2Library.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Pair.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Router01.sol';
import './interfaces/IUniswapV2Router02.sol';
import './interfaces/IWETH.sol'; 


contract FlashSwap {
    IWETH immutable WETH;
    address Beneficiary;
    address ApeSwapFactory;
    address PancakeFactory;
    address PancakeRouter;
    address ApeRouter;
    constructor(address pancakeFactory, address apeFactory, address wethAddress , address apeRouter, address pancakeRouter, address beneficiaryAddress) public {
         ApeSwapFactory = apeFactory;
         PancakeFactory = pancakeFactory;
         WETH = IWETH(wethAddress);
         Beneficiary = beneficiaryAddress;
         PancakeRouter = pancakeRouter;
         ApeRouter = apeRouter; 
    }
    
    
    function startArbitrage(
    address token0,
    address token1,
    uint amount0, 
    uint amount1,
    address startFactory,
    address endRouterAddress,
    uint repay
  ) external {
  
    address pairAddress =   IUniswapV2Factory(startFactory).getPair(token0, token1);
    require(pairAddress != address(0), 'This pool does not exist');
    IUniswapV2Pair(pairAddress).swap(
      amount0, 
      amount1, 
      address(this), 
      abi.encode(endRouterAddress, repay) //not empty bytes param will trigger flashloan
    );
  }
    
    receive() external payable {}

 function pancakeCall(address sender, uint amount0, uint amount1, bytes calldata data) external {
        address[] memory path = new address[](2);
       ( address endRouter, uint repay) = abi.decode(data, (address, uint));
        uint amountToken;
        uint amountEth;
        IERC20 token;
        
        // scope for token{0,1}, avoids stack too deep errors
        {
        address token0 = IUniswapV2Pair(msg.sender).token0();
        address token1 = IUniswapV2Pair(msg.sender).token1();
        path[0] = amount0 == 0 ? token1 : token0; 
        path[1] = amount0 == 0 ? token0 : token1; 

        amountToken = token0 == address(WETH) ? amount1 : amount0;    
        amountEth = token0 == address(WETH) ? amount0 : amount1;
        token = IERC20(path[0] == address(WETH) ? path[1] : path[0]);

        }

 }
}
