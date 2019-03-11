pragma solidity  ^0.5.0;
pragma experimental ABIEncoderV2;

import './Event.sol';

contract EventFactory {
  struct EventStruct {
    uint id;
    string name;
    string description;
    uint start;
    uint end;
  }
  uint public nextId = 1;
  address[] public events;

  function createEvent(
    string calldata name, 
    string calldata description,
    uint start,
    uint end
  ) external {
    Event newEvent = new Event(nextId, name, description, start, end);
    events.push(address(newEvent));
    nextId++;
  }

  function getEvents() external returns(EventStruct[] memory) {
    EventStruct[] memory eventResults = new EventStruct[](nextId - 1);
    for(uint i = 0; i < nextId - 1; i++) {
      Event eventContract = Event(events[i]);
      eventResults[i] = EventStruct(
        eventContract.id(),
        eventContract.name(),
        eventContract.description(),
        eventContract.start(),
        eventContract.end()
      );
    }
    return eventResults;
  }

  function getEvent(uint id) external returns(EventStruct memory) {
    require(id >= 1 && id <= events.length, 'This event does not exist');
    Event eventContract = Event(events[id - 1]);
    return EventStruct(
      eventContract.id(),
      eventContract.name(),
      eventContract.description(),
      eventContract.start(),
      eventContract.end()
    );
  }
}
