pragma solidity ^0.6.0;

contract MyContract {
    //185 basis points = 1.85 pct
    function calculateFee(uint amount) external pure returns(uint) {
        require((amount / 10000) * 10000 == amount, 'too small');
        
        return amount * 185 / 10000;
    }
}
