pragma solidity ^0.5.0;

import './IERC1155.sol';

contract ConditionalTokensWallet is IERC1155 {
  IERC20 dai;
  ConditionalTokens conditionalTokens;

  constructor(address _dai, address _conditionalTokens, address _oracle) public {
    dai = IERC20(_dai);
    conditionalTokens = ConditionalTokens(_conditionalTokens);
    oracle = _oracle;
  }

  function redeemConditionalTokens(bytes32 conditionId, uint[] calldata indexSets) external {
    conditionalTokens.redeemPositions(
      dai, 
      bytes32(0),
      conditionId,
      indexSets
    );
  }

  function transferDai(address to, address amount) external {
    dai.transfer(to, amount);
  }

  function onERC1155Received(
    address _operator, 
    address _from, 
    uint256 _id, 
    uint256 _value, 
    bytes calldata _data) external returns(bytes4) {
      return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
  }

  function onERC1155BatchReceived(
    address _operator, 
    address _from, 
    uint256[] calldata _ids, 
    uint256[] calldata _values, 
    bytes calldata _data) external returns(bytes4) {
      return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
  }
}
