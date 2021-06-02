// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract SimpleStorage {
    string public data;

    event DataChange(string newData);

    function setData(string memory _data) public {
        emit DataChange(_data);
        data = _data;
    }
}