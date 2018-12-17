pragma solidity ^0.4.24;
//
contract ToDo {
  struct Task {
    uint id;
    uint date;
    string content;
    string author;
    bool done;
  }

  uint lastTaskId;
  uint[] taskIds;
  mapping(uint => Task) tasks;

  event TaskCreated(uint, uint, string, string, bool);

  function ToDo() public {
    lastTaskId = 0;
  }

  function createTask(string _content, string _author) public {
    lastTaskId++;
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false);
    taskIds.push(lastTaskId);
    TaskCreated(lastTaskId, now, _content, _author, false);
  }

  function getTaskIds() public constant returns(uint[]) {
    return taskIds;
  }

  function getTask(uint id) taskExists(id) public constant 
    returns(
      uint,
      uint,
      string,
      string,
      bool
    ) {

      return(
        id,
        tasks[id].date,
        tasks[id].content,
        tasks[id].author,
        tasks[id].done
      );
    }

    modifier taskExists(uint id) {
      if(tasks[id].id == 0) {
        revert();
      }
      _;
    }
}
