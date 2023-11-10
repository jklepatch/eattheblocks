pragma solidity =0.6.6;
pragma experimental ABIEncoderV2;



import './interfaces/IPancakeRouter01.sol';
import './interfaces/IPancakeRouter02.sol';
import './interfaces/IPancakeCallee.sol';  
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
import './interfaces/IPancakePair.sol';
import './interfaces/IPancakeFactory.sol';

import './libraries/SafeMath.sol';
import './libraries/PancakeLibrary.sol';


contract FlashSwap is IPancakeCallee {
    address apeRouter;
    address pancakeRouter;
    IWETH immutable WETH;
    address beneficiary;
    address apefactory;
    address pancakefactory;

    constructor(address _pancakefactory, address _apefactory, address _aperouter, address _pancakerouter, address beneficiaryAddress) public {
         apefactory = _apefactory;
         pancakefactory = _pancakefactory;
         apeRouter = _aperouter;
         pancakeRouter =_pancakerouter;
         WETH = IWETH(IPancakeRouter01(pancakeRouter).WETH());
         beneficiary = beneficiaryAddress;
    }
    
    function startArbitrage(
    address token0,
    address token1,
    uint amount0, 
    uint amount1,
    uint Direction,
    uint Slippage
  ) external {
  

    address pairAddress = Direction == 0 ?  IPancakeFactory(apefactory).getPair(token0, token1) : IPancakeFactory(pancakefactory).getPair(token0, token1);
    
    
    require(pairAddress != address(0), 'This pool does not exist');
    IPancakePair(pairAddress).swap(
      amount0, 
      amount1, 
      address(this), 
      abi.encode(Direction,Slippage) //not empty bytes param will trigger flashloan
    );
  }
    
    receive() external payable {}

 function pancakeCall(address sender, uint amount0, uint amount1, bytes calldata data) external override {
        address[] memory path = new address[](2);
        (uint direction, uint slippage) = abi.decode(data,(uint, uint));
        uint amountToken;
        uint amountETH;
        
        { // scope for token{0,1}, avoids stack too deep errors
        address token0 = IPancakePair(msg.sender).token0();
        address token1 = IPancakePair(msg.sender).token1();
      
        path[0] = amount0 == 0 ? token1 : token0;
        path[1] = amount0 == 0 ? token0 : token1; 
        amountToken = token0 == address(WETH) ? amount1 : amount0;    
        amountETH = token0 == address(WETH) ? amount0 : amount1;
        }
        
        
        IERC20 token = IERC20(path[0] == address(WETH) ? path[1] : path[0]);
        
        
        
   
    }
}