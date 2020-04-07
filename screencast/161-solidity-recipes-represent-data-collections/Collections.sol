pragma solidity 0.6.4;
pragma experimental ABIEncoderV2;

contract Collections {
    struct User {
        address userAddress;
        uint balance;
    }
    //Method 1
    //User[] users;
    //Method 2
    //mapping(uint => User) users;
}
