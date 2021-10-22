pragma solidity 0.8.0;

contract MyContractol {
    uint data;

    function read() external view returns(uint) {
        return data;
    }

    function write(uint _data) external {
        data = _data;
    }
}