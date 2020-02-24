pragma solidity 0.6.3;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import './ICToken.sol';

contract Dex {
  
  //represent an ERC20 token.
  struct Token {
    bytes32 ticker; //3 letters that describt the token (ex: DAI). we dont use strings because they are hard to manipulate in Solidity
    address tokenAddress;     //Address of  ERC20 token
    address cTokenAddress;    //Address of cToken (Compound. ex: cDai, cBat, etc..)
  }
  
  //Collections of tokens. tokens is to quickly find a specific token, and tokenList is to enumerate all tokens
  mapping(bytes32 => Token) public tokens; 
  bytes32[] public tokenList;
  //balances of ERC20 tokens, by address (trader) and token (ex: 0x782442 => DAI => 20)
  mapping(address => mapping(bytes32 => uint)) public balances;
  //balances of ERC20 tokens, by token
  mapping(bytes32 => uint) public totalBalances;
  //address that has special permissions like adding new tokens
  address public admin;
  
  constructor() public {
    admin = msg.sender;
  }
  
  
  //add a token to the registry. Before we can trade a new token it needs to be added here
  function addToken(
    bytes32 ticker, 
    address tokenAddress,
    address cTokenAddress) 
    onlyAdmin()
    external {
    tokens[ticker] = Token(ticker, tokenAddress, cTokenAddress);
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
    address tokenAddress = tokens[ticker].tokenAddress;
    address cTokenAddress = tokens[ticker].cTokenAddress; 
    IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
    IERC20(tokenAddress).approve(address(this), amount);
    ICToken(cTokenAddress).mint(amount);
    balances[msg.sender][ticker] += amount;
  }

  //traders withdraw ERC20 tokens after trading
  function withdraw(
    uint amount, 
    bytes32 ticker, 
    address to) 
    tokenExist(ticker)
    external {
    require(balances[msg.sender][ticker] >= amount);
    balances[msg.sender][ticker] -= amount;
    Token storage token = tokens[ticker];
    ICToken(token.cTokenAddress).redeemUnderlying(amount);
    IERC20(token.tokenAddress).transfer(to, amount);
  }
  
  //TOdo: finish this function
  function withdrawProfit(address to) 
    onlyAdmin()
    external {
    for (uint i = 0; i < tokenList.length; i++) {
      Token storage token = tokens[tokenList[i]];
      //todo:  create balance per token
      //Step 1: getBalanceOfUnderlying
      //Step 2: calculate difference between current erc20 balance and balance per token
      //Step 3: redeem profits
      //Step 4: send the profits
      ICToken cToken = ICToken(token.cTokenAddress);
      uint compoundTokenBalance = cToken.balanceOfUnderlying(address(this));
      uint profits = compoundTokenBalance - totalBalances[token.ticker]; 
      cToken.redeemUnderlying(profits);
      IERC20(token.tokenAddress).transfer(to, profits);
    }
  }
  
  modifier tokenExist(bytes32 ticker) {
    require(tokens[ticker].tokenAddress != address(0), 'This token does not exist');
    _;
  }
  
  modifier onlyAdmin() {
    require(msg.sender == admin, 'Only admin');
    _;
  }
}
