pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract ToDo {
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
    uint dateComplete;
  }

  uint lastTaskId;
  mapping(uint => Task) tasks;

  event TaskCreated(
    uint id,
    uint date,
    string content,
    string author,
    bool done
  );

  event TaskStatusToggled(
    uint id, 
    bool done, 
    uint date
  );

  function createTask(
    string calldata _content, 
    string calldata _author) 
    external {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false, 0);
    emit TaskCreated(lastTaskId, now, _content, _author, false);
  }

  function getTasks()
    external
    view
    returns(Task[] memory) {
    Task[] memory _tasks = new Task[](lastTaskId);
    for(uint i = 0; i < lastTaskId; i++) {
      _tasks[i] = tasks[i];
    }
    return _tasks;
  }

  function toggleDone(uint id) 
    external
    taskExists(id) {
    Task storage task = tasks[id];
    task.done = !task.done;
    task.dateComplete = task.done ? now : 0;
    emit TaskStatusToggled(id, task.done, task.dateComplete);
  }

  modifier taskExists(uint id) {
    if(tasks[id].id == 0) {
      revert();
    }
    _;
  }
}
