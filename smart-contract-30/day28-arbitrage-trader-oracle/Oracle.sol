pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

contract Oracle {
    struct Result {
        bool exist;
        uint payload;
        address[] approvedBy;
    }
    address[] public validators;
    mapping(bytes32 => Result) public results;
    
    constructor(address[] memory _validators) public {
        validators = _validators;
    }
    
    function feedData(bytes32 dataKey, uint payload) external onlyValidator() {
        address[] memory _approvedBy = new address[](1);
        _approvedBy[0] = msg.sender;
        require(results[dataKey].exist == false, 'This data was already imported before');
        results[dataKey] = Result(true, payload, _approvedBy);
    }
    
    function approveData(bytes32 _dataKey) external onlyValidator() {
        Result storage result = results[_dataKey];
        require(result.exist == true, 'Cant approved non-existing data');
        for(uint i = 0; i < result.approvedBy.length; i++) {
            require(result.approvedBy[i] != msg.sender, 'Cannot approve same data twice');
        }
        result.approvedBy.push(msg.sender);
    }
    
    function getData(bytes32 _dataKey) view external returns(Result memory) {
        return results[_dataKey];
    }
    
    modifier onlyValidator() {
        bool isValidator = false;
        for(uint i = 0; i < validators.length; i++) {
            if(validators[i] == msg.sender) {
                isValidator = true;
            }
        }
        require(isValidator == true, 'Only Validator');
        _;
    }
}
