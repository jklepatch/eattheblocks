pragma solidity ^0.5.2;

contract Buggy {
    function willAssert() pure external {
        assert(false == true);
    }
    
    function willRequire() pure external {
        require(false == true);
    }
    
    function willRevert() pure external {
        revert('');
    }
}
