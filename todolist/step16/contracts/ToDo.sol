pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

contract ToDo {
  struct Task {
    uint id;
    uint date;
    bytes32 content;
    bytes32 author;
    bool done;
    uint dateComplete;
  }

  uint lastTaskId;
  mapping(uint => Task) tasks;

  event TaskCreated(
    uint id,
    uint date,
    bytes32 content,
    bytes32 author,
    bool done
  );

  event TaskStatusToggled(
    uint id, 
    bool done, 
    uint date
  );

  function createTask(
    bytes32 _content, 
    bytes32 _author) 
    external {
    tasks[lastTaskId] = Task(lastTaskId, now, _content, _author, false, 0);
    emit TaskCreated(lastTaskId, now, _content, _author, false);
    lastTaskId++;
  }

  //Original function (does not work because of web3)
  //function getTasks()
  //  external
  //  view
  //  returns(Task[] memory) {
  //  Task[] memory _tasks = new Task[](lastTaskId);
  //  for(uint i = 0; i < lastTaskId; i++) {
  //    _tasks[i] = tasks[i];
  //  }
  //  return _tasks;
  //}

  //Work-around
  function getTasks()
    external
    view
    returns(
      uint[] memory, 
      uint[] memory, 
      bytes32[] memory,
      bytes32[] memory,
      bool[] memory,
      uint[] memory
    ) {
    uint[] memory ids = new uint[](lastTaskId);
    uint[] memory dates = new uint[](lastTaskId);
    bytes32[] memory contents = new bytes32[](lastTaskId);
    bytes32[] memory authors = new bytes32[](lastTaskId);
    bool[] memory dones = new bool[](lastTaskId);
    uint[] memory dateCompletes = new uint[](lastTaskId);
    for(uint i = 0; i < lastTaskId; i++) {
      ids[i] = tasks[i].id;
      dates[i] = tasks[i].date;
      contents[i] = tasks[i].content;
      authors[i] = tasks[i].author;
      dones[i] = tasks[i].done; 
      dateCompletes[i] = tasks[i].dateComplete;
    }
    return (ids, dates, contents, authors, dones, dateCompletes);
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
    if(tasks[id].date == 0) {
      revert();
    }
    _;
  }
}
