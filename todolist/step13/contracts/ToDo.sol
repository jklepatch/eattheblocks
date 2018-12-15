pragma solidity ^0.4.24;

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

  event TaskStatusToggled(uint id, bool done, uint date);

  constructor() public {
    lastTaskId = 0;
  }

  function createTask(string _content, string _author) public {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false, 0);
    taskIds.push(lastTaskId);
    emit TaskCreated(lastTaskId, now, _content, _author, false);
  }

  function getTaskIds() public constant returns(uint[]) {
    return taskIds;
  }

  function getTaskFixtures(uint _id) public constant returns(
      uint,
      uint,
      string,
      string,
      bool
     ) {
    return (0, now, "Create more tutorials for ETB", "Julien", false);
  }

  function getTask(uint id) taskExists(id) public constant
    returns(
      uint,
      uint,
      string,
      string,
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

    function toggleDone(uint id) taskExists(id) public {
      Task task = tasks[id];
      task.done = !task.done;
      task.dateComplete = task.done ? now : 0;
      TaskStatusToggled(id, task.done, task.dateComplete);
    }

    modifier taskExists(uint id) {
      if(tasks[id].id == 0) {
        revert();
      }
      _;
    }
}
