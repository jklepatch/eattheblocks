pragma solidity ^0.5.6;

interface ERC20Interface {
    function transfer(address to, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function approve(address spender, uint tokens) public returns (bool success);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function totalSupply() public view returns (uint);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract ERC20Token is ERC20Interface {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint public totalSupply;
    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowed;
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint _totalSupply)
        public {
            name = _name;
            symbol = _symbol;
            decimals = _decimals;
            totalSupply = _totalSupply;
            balances[msg.sender] = _totalSupply;
        }
        
    function transfer(address to, uint value) public returns(bool) {
        require(balances[msg.sender] >= value);
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint value) public returns(bool) {
        uint allowance = allowed[from][msg.sender];
        require(balances[msg.sender] >= value && allowance >= value);
        allowed[from][msg.sender] -= value;
        balances[msg.sender] -= value;
        balances[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint value) public returns(bool) {
        require(spender != msg.sender);
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
