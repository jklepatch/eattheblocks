pragma solidity ^0.7.3;

contract TokenCustom {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint public totalSupply;
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowed;
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint _initialSupply)
        public {
            name = _name;
            symbol = _symbol;
            decimals = _decimals;
            totalSupply = _initialSupply;
            balances[msg.sender] = _initialSupply;
        }
        
    function transfer(address to, uint value) public returns(bool) {
        require(balances[msg.sender] >= value, 'token balance too low');
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint value) public returns(bool) {
        uint allowance = allowed[from][msg.sender];
        require(allowance >= value, 'allowance too low');
        require(balances[from] >= value, 'token balance too low');
        allowed[from][msg.sender] -= value;
        balances[from] -= value;
        balances[to] += value;
        emit Transfer(from, to, value);
        return true;
    }
    
    function approve(address spender, uint value) public returns(bool) {
        allowed[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function allowance(address owner, address spender) public view returns(uint) {
        return allowed[owner][spender];
    }
    
    function balanceOf(address owner) public view returns(uint) {
        return balances[owner];
    }
}
