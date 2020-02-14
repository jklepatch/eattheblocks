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
  uint[] taskIds;
  mapping(uint => Task) tasks;

  event TaskCreated(
    uint id,
    uint date,
    string content,
    string author,
    bool done);

  constructor() public {
    lastTaskId = 0;
  }

  function createTask(string calldata _content, string calldata _author) external {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false, 0);
    taskIds.push(lastTaskId);
  }

  function getTaskIds() external view returns(uint[] memory) {
    return taskIds;
  }

  function getTasks() external view returns(Task[] memory) {
    Task[] memory _tasks = new Task[](taskIds.length);
    for(uint i = 0; i < taskIds.length; i++) {
      _tasks[i] = tasks[taskIds[i]];
    }
    return _tasks;
  }

  function getTask(uint id) taskExists(id) external view
    returns(
      uint,
      uint,
      string memory,
      string memory,
      bool,
      uint
    ) {

      return(
        id,
        tasks[id].date,
        tasks[id].content,
        tasks[id].author,
        tasks[id].done,
        tasks[id].dateComplete
      );
    }

    function toggleDone(uint id) taskExists(id) external {
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
