pragma solidity ^0.5.16;

contract UniswapFactoryMock {
  uint public pairIndex;

  event PairCreated(
    address indexed token0, 
    address indexed token1, 
    address pair, 
    uint
  );

  function createPair(address token0, address token1) external {
    emit PairCreated(
      token0,
      token1,
      address(0),
      pairIndex
    );
    pairIndex++;
  }
}

