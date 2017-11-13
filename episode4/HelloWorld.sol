pragma solidity ^0.4.18;

contract HelloWorld {
  bytes32 message;
  function HelloWorld(bytes32 myMessage) {
    message = myMessage;
  }

  function getMessage() returns(bytes32) {
    return message;
  }
}