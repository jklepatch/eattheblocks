pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;




import './IPancakeRouter02.sol';
import './interfaces/IPancakePair.sol';
import './interfaces/IPancakeFactory.sol';
import './interfaces/IPancakeERC20.sol';
import './libraries/SafeMath.sol';
import './PancakeLibrary.sol';

contract Flashloan {
    
  
  bytes arbdata;
  enum Direction { BakerytoPancake,PancaketoBakery  } 
  struct ArbInfo {
        Direction direction;
        uint repayAmount;
          }
         

  constructor() public {
    
  }

  function startArbitrage(
    address token0, 
    address token1, 
    uint amount0, 
    uint amount1,
    Direction _direction,
    uint repayAmount
  ) external {
  

     
    arbdata = abi.encode(ArbInfo({direction: _direction, repayAmount: repayAmount}));
    address pairAddress = IPancakeFactory().getPair(token0, token1);
    require(pairAddress != address(0), 'This pool does not exist');
    IPancakePair(pairAddress).swap(
      amount0, 
      amount1, 
      address(this), 
      bytes ('not empty') //not empty bytes param will trigger flashloan
    );
  }

  function pancakeCall(
    address _sender, 
    uint _amount0, 
    uint _amount1, 
    bytes calldata data
  
  ) external {
    ArbInfo memory arbInfo = abi.decode(arbdata, (ArbInfo));
    uint amountToken = _amount0 == 0 ? _amount1 : _amount0;    
    
    address token0 = IPancakePair(msg.sender).token0();    
    address token1 = IPancakePair(msg.sender).token1();

    
    require(_amount0 == 0 || _amount1 == 0); 

    

      
    
   
    
   
  }
  
}