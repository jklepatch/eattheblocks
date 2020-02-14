pragma solidity ^0.5.9;

contract Bitmap {
    
    //1. Add to a bitmap
    //2. Read a bitap
    //3. Count a bitmap
    uint256 public attendees;
    
    function addAttendee(uint256 _index) external {
        require(_index >= 1 && _index <= 256, 'must be between 1 and 256');
        attendees |= (1 << (_index - 1));
    }

    function checkAttendee(uint256 _index) view external returns(bool) {
        require(_index >= 1 && _index <= 256, 'must be between 1 and 256');
        return (attendees & (1 << (_index -1))) != 0;
    }
    
    function getAttendeeCount() view external returns(uint) {
        // brian kerninghan bit-counting method - O(log(n))
        uint _attendees = attendees;
        uint attendeeCount;
        while (_attendees != 0) {
            _attendees &= (_attendees - 1);
            attendeeCount++;
        }
        return attendeeCount;
    }
}
