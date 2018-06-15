pragma solidity ^0.4.24;

contract ToDo {
  string[] tasks;

  event Foo(string description);

  //Read-only function (i.e will not trigger a transaction)
  function getTask(uint i) public view returns(string) {
    return tasks[i];
  }

  //Write function (i.e Will create a transaction)
  function addTask(string taskName) public {
    tasks.push(taskName);
  }

  function triggerEvent(string description) public {
    emit Foo(description);
  }

}
