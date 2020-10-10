pragma solidity ^0.7.3;  

interface IWeth {
    function deposit() external payable;
    function withdraw(uint wad) external;
    function approve(address guy, uint wad) external returns (bool);
    function balanceOf(address owner) external view returns(uint);
}
