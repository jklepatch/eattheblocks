pragma solidity ^0.5.6;

interface ERC20Interface {
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);
    function balanceOf(address tokenOwner) external view returns (uint balance);
    function approve(address spender, uint tokens) external returns (bool success);
    function allowance(address tokenOwner, address spender) external view returns (uint remaining);
    function totalSupply() external view returns (uint);

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

contract ICO {
  struct Sale {
    address investor;
    uint quantity; //quantity of token sold
  }
  address public token;
  uint public price; //token per wei
  uint public availableTokens; //# of tokens available for sale
  uint public minPurchase;
  uint public maxPurchase;
  uint public end;
  bool public released;
  address public admin;
  mapping(address => bool) public investors; //pre-approved investors
  Sale[] public sales;

  constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    uint _totalSupply,
    uint _price) public {
    token = address(new ERC20Token(
      _name,
      _symbol,
      _decimals,
      _totalSupply
    ));
    admin = msg.sender;
  }

  function start(
    uint duration, 
    uint _price, 
    uint _availableTokens,
    uint _minPurchase,
    uint _maxPurchase) 
    external 
    onlyAdmin() 
    icoActive(false) {
    uint totalSupply = ERC20Token(token).totalSupply();
    require(duration > 0, 'duration needs to be > 0');
    require(_availableTokens > 0 && _availableTokens <= totalSupply, '_availableTokens need be above 0 and max equal to token totalSupply');
    require(_minPurchase > 0, '_minPurchase needs to be > 0'); 
    require(_maxPurchase > 0 && _maxPurchase <= _availableTokens , '_maxPurchase needs to be > 0'); 
    end = now + duration;
    price = _price;
    availableTokens = _availableTokens;
    minPurchase = _minPurchase;
    maxPurchase = _maxPurchase;
  }

  function whitelist(address investor) 
    external 
    onlyAdmin() {
    investors[investor] = true;
  }

  function buy() 
    payable 
    external 
    onlyInvestors()
    icoActive(true) {
    uint quantity = msg.value * price;
    require(msg.value >= minPurchase && msg.value <= maxPurchase, 'have to send between minPurchase and maxPurchase');
    require(quantity <= availableTokens, 'Not enough tokens left for sale');
    require(msg.value % price == 0, 'have to send a multiple of price');
    availableTokens += quantity;
    sales.push(Sale(msg.sender, quantity));
  }

  function release()
    external 
    onlyAdmin() 
    icoEnded() 
    tokensReleased(false) {
    ERC20Token tokenInstance = ERC20Token(token);
    for(uint i = 0; i < sales.length; i++) {
      Sale storage sale = sales[i];
      tokenInstance.transfer(sale.investor, sale.quantity);
    }
  }

  function withdraw(
    address payable to,
    uint amount) 
    external
    onlyAdmin()
    icoEnded()
    tokensReleased(true) {
    address(to).transfer(amount);
  }
  
  modifier onlyAdmin() {
    require(msg.sender == admin, 'only admin');
    _;
  }

  modifier onlyInvestors() {
    require(investors[msg.sender] == true, 'only investors');
    _;
  }

  modifier icoActive(bool activeStatus) {
    bool status = end > 0 && now < end && availableTokens > 0;
    if(activeStatus == true) {
      require(status == true, 'ICO must be active');
    } else {
      require(status == false, 'ICO must NOT be active');
    }
    _;
  }

  modifier icoEnded() {
    require(end > 0 
      && (now >= end || availableTokens == 0), 'ICO must have ended');
    _;
  }

  modifier tokensReleased(bool releasedStatus) {
    if(releasedStatus == true) {
      require(released == true, 'Token must have been released');
    } else {
      require(released == false, 'Token must NOT have been released');
    }
    _;
  }
}
