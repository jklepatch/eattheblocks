pragma solidity ^0.4.17;

contract ToDo {
  string[] tasks;

  event Foo(string description);

  //non-constant functions (i.e create a transaction)
  function addTask(string taskName) public {
    tasks.push(taskName);
  }

  function triggerEvent(string description) public {
    Foo(description);
  }

  //constant function(s) (i.e will not trigger a transaction)
  function getTask(uint i) public constant returns(string) {
    return tasks[i];
  }
}