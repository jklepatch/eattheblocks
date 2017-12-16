pragma solidity ^0.4.18;

contract HelloWorld {
  string message;
  function HelloWorld(string myMessage) {
    message = myMessage;
  }

  function getMessage() constant returns(string) {
    return message;
  }
}