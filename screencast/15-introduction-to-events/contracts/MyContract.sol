pragma solidity ^0.5.0;


contract MyContract {
  string public data;

  event DataUpdated ( 
    string oldVal,
    string newVal,
    address indexed by,
    uint date
  );
  
  function updateData(string calldata _data) external {
    emit DataUpdated(data, _data, msg.sender, now);
    data = _data;
  }
}
