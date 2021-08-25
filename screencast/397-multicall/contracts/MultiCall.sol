pragma solidity ^0.8.7;

contract MultiCall {
  constructor(
    address[] memory targets,
    bytes[] memory args
  ) {
    uint256 len = targets.length;
    require(args.length == len, 'Error: Array lengths do not match.');

    bytes[] memory returnDatas = new bytes[](len);

    for (uint256 i = 0; i < len; i++) {
      address target = targets[i];
      bytes memory arg = args[i];
      (bool success, bytes memory returnData) = target.call(arg);
      if (!success) {
        returnDatas[i] = bytes("");
      } else {
        returnDatas[i] = returnData;
      }
    }
    bytes memory data = abi.encode(block.number, returnDatas);
    assembly { return(add(data, 32), data) }
  }
}
