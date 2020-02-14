pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Todo {
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
    uint dateComplete;
  }

  uint lastTaskId = 1;
  uint[] taskIds;
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

  function createTask(string calldata _content, string calldata _author) external {
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false, 0);
    taskIds.push(lastTaskId);
    lastTaskId++;
    emit TaskCreated(lastTaskId, now, _content, _author, false);
  }

  function getTask(uint id) taskExists(id) external view returns(Task memory) {
    Task storage task = tasks[id];
    return task;
  }

  function toggleDone(uint id) taskExists(id) external {
    Task storage task = tasks[id];
    task.done = !task.done;
    task.dateComplete = task.done ? now : 0;
    emit TaskStatusToggled(id, task.done, task.dateComplete);
  }

  modifier taskExists(uint id) {
    require(tasks[id].date == 0, 'This task does not exist');
    _;
  }
}
