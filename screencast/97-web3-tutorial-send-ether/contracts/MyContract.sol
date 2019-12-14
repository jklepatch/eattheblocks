pragma solidity ^0.5.0;

contract MyContract {
  string public functionCalled;

  function sendEther() external payable {
    functionCalled = 'sendEther';
  }

  function() external payable {
    functionCalled = 'fallback';
  }
}
