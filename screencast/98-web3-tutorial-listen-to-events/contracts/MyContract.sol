pragma solidity ^0.5.0;

contract MyContract {
  event MyEvent (
    uint indexed id,
    uint indexed date,
    string indexed value
  );
  uint nextId;

  function emitEvent(string calldata value) external {
    emit MyEvent(nextId, now, value);
    nextId++;
  }
}
