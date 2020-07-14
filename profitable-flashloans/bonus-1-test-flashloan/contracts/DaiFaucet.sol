pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DaiFaucet {
  IERC20 dai;

  constructor(address daiAddress) public {
    dai = IERC20(daiAddress);
  }

  function sendDai(uint amount) external {
    dai.transfer(msg.sender, amount);
  }
}
