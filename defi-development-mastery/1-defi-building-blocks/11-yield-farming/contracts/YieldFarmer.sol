pragma solidity ^0.7.2;

contract YieldFarmer {
  function rebalance() external {
    uint yieldA = pricer.getYieldA();
    uint yieldB = pricer.getYieldB();
    uint yieldC = pricer.getYieldC();
    if(yieldA >= yieldB && yieldA >= yieldC) {
      
    }
    if(yieldB >= yieldA && yieldB >= yieldC) {
    }
    if(yieldC >= yieldA && yieldC >= yieldB) {
    }
  }

  function getYieldA() public view returns(uint) {
  }
  function getYieldB() public view returns(uint) {
  }
  function getYieldC() public view returns(uint) {
  }
}
