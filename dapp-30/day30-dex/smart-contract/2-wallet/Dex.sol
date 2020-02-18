pragma solidity 0.6.2;

//Goal: add a wallet so that traders can withdraw and deposit ERC20 tokens before and after trading

//Need to import the interface of ERC20 so that we can interact with tokens from our Dex smart contract
//Note: Openzeppelin wasn't updated to Solidity 0.6 yet, so we can
//reference their source code with the pragma statement of Solidity 0.5.
//I just copy pasted their code here to make it work.
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Dex {
  
  //represent an ERC20 token.
  struct Token {
    bytes32 ticker; //3 letters that describt the token (ex: DAI). we dont use strings because they are hard to manipulate in Solidity
    address at;     //Address
  }
  
  //Collections of tokens. tokens is to quickly find a specific token, and tokenList is to enumerate all tokens
  mapping(bytes32 => Token) public tokens; 
  bytes32[] public tokenList;
  //balances of ERC20 tokens, by address (trader) and token (ex: 0x782442 => DAI => 20)
  mapping(address => mapping(bytes32 => uint)) private balances;
  //address that has special permissions like adding new tokens
  address public admin;
  
  constructor() public {
    admin = msg.sender;
  }
  
  //add a token to the registry. Before we can trade a new token it needs to be added here
  function addToken(
    bytes32 ticker, 
    address at) 
    onlyAdmin()
    external {
    tokens[ticker] = Token(ticker, at);
    for (uint i = 0; i < tokenList.length; i++) {
      if(tokenList[i] == ticker) {
        return;
      }
    }
    tokenList.push(ticker);
  }

  // traders deposit ERC20 tokens before trading. 
  //Note: traders need to call approve() on the ERC20 token before calling deposit()
  function deposit(
    uint amount, 
    bytes32 ticker) 
    tokenExist(ticker)
    external {
    IERC20(tokens[ticker].at).transferFrom(msg.sender, address(this), amount);
    balances[msg.sender][ticker] += amount;
  }

  //traders withdraw ERC20 tokens after trading
  function withdraw(
    uint amount, bytes32 ticker, 
    address to) 
    tokenExist(ticker)
    external {
    require(balances[msg.sender][ticker] >= amount);
    balances[msg.sender][ticker] -= amount;
    IERC20(tokens[ticker].at).transfer(to, amount);
  }
  
  modifier tokenExist(bytes32 ticker) {
    require(tokens[ticker].at != address(0), 'This token does not exist');
    _;
  }
  
  modifier onlyAdmin() {
    require(msg.sender == admin, 'Only admin');
    _;
  }
}
