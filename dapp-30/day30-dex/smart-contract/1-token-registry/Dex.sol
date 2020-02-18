pragma solidity 0.6.2;

//Goal: add a token registry, i.e a list of tokens, so that the DEX knows what it can trade

contract Dex {
  
  //represent an ERC20 token.
  struct Token {
    bytes32 ticker; //3 letters that describt the token (ex: DAI). we dont use strings because they are hard to manipulate in Solidity
    address at;     //Address
  }
  
  //Collections of tokens. tokens is to quickly find a specific token, and tokenList is to enumerate all tokens
  mapping(bytes32 => Token) public tokens; 
  bytes32[] public tokenList;
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
  
  modifier onlyAdmin() {
    require(msg.sender == admin, 'Only admin');
    _;
  }
}
