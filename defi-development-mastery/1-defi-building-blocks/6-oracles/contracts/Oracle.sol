pragma solidity ^0.7.3;

contract Oracle {
  struct Data {
    uint date;
    uint payload;
  }
  address public admin;
  mapping(address => bool) public reporters;
  mapping(bytes32 => Data) public data;

  constructor(address _admin) {
    admin = _admin;
  }

  function updateReporter(address reporter, bool isReporter) external {
    require(msg.sender == admin, 'only admin');
    reporters[reporter] = isReporter;
  }

  function updateData(bytes32 key, uint payload) external {
    require(reporters[msg.sender] == true, 'only reporters');
    data[key] = Data(block.timestamp, payload); 
  }

  function getData(bytes32 key) 
    external 
    view 
    returns(bool result, uint date, uint payload) {
    if(data[key].date == 0) {
      return (false, 0, 0);
    }
    return (true, data[key].date, data[key].payload);
  }
}
