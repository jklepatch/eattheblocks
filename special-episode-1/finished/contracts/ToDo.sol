pragma solidity ^0.4.17;

contract ToDo {
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }

  uint private lastTaskId;
  uint[] private taskIds;
  mapping(uint => Task) private tasks;

  event TaskCreated(uint id, uint date, string content, string author);
  event TaskStatusToggled(uint id, bool done);

  function ToDo() public {
    lastTaskId = 0;
  }

  function createTask(string _content, string _author) public {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false);
    taskIds.push(lastTaskId);
    TaskCreated(lastTaskId, now, _content, _author);
  }

  function toggleTaskStatus(uint id) taskExist(id) public {
    tasks[id].done = !tasks[id].done;
    TaskStatusToggled(id, tasks[id].done);
  }

  function getTaskIds() public constant returns(uint[]) {
    return taskIds;
  }

  function getTask(uint id) taskExist(id) public constant returns(uint, uint, string, string, bool) {
    return(id, tasks[id].date, tasks[id].content, tasks[id].author, tasks[id].done);
  }

  modifier taskExist(uint id) {
    if (tasks[id].id == 0) {
      revert();
    }
    _;
  }
}