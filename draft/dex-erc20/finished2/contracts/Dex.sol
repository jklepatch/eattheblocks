pragma solidity ^0.5.9;
pragma experimental ABIEncoderV2;

import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';

contract Dex {
  struct Token {
    bytes32 ticker;
    address at;
  }

  struct Order {
    uint id;
    address user;
    uint filled;
    uint amount;
    uint price;
    uint date;
  }

  struct Trade {
    uint id;
    address user1;
    address user2;
    uint amount;
    uint price;
    uint date;
  }

  enum Side {
    BUY,
    SELL
  }

  mapping(bytes32 => Token) private tokens; 
  bytes32[] private tokenList;
  mapping(address => mapping(bytes32 => uint)) private balances;
  mapping(bytes32  => mapping(uint => Order[])) private books;
  mapping(bytes32 => Trade[]) private trades;
  uint private nextOrderId;
  uint private nextTradeId;
  address private admin;

  constructor() public {
    admin = msg.sender;
  }

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

  function deposit(
    uint amount, 
    bytes32 ticker) 
    tokenExist(ticker)
    external {
    IERC20(tokens[ticker].at).transferFrom(msg.sender, address(this), amount);
    balances[msg.sender][ticker] += amount;
  }

  function withdraw(
    uint amount, bytes32 ticker, 
    address to) 
    tokenExist(ticker)
    external {
    require(balances[msg.sender][ticker] >= amount);
    balances[msg.sender][ticker] -= amount;
    IERC20(tokens[ticker].at).transfer(to, amount);
  }

  function addLimitOrder(
    bytes32 ticker, 
    uint amount, 
    uint price, 
    Side side) 
    tokenExist(ticker)
    external {
      if (side == Side.SELL) {
        require(balances[msg.sender][ticker] >= amount, 'Token balance is too low');  
      } else {
        require(balances[msg.sender][bytes32('WETH')] >= amount * price, 'WETH balance is too low');
      }
      Order[] storage orders = books[ticker][uint(side)];
      orders.push(Order(
        nextOrderId++, 
        msg.sender,
        0,
        amount, 
        price,
        now //solhint-disable-line not-rely-on-time
      ));
      uint i = orders.length - 1;
      while (i > 0) {
        if (side == Side.BUY && orders[i].price < orders[i - 1].price) {
          break;
        }
        if (side == Side.SELL && orders[i].price > orders[i - 1].price) {
          break;
        }
        Order memory order = orders[i - 1];
        orders[i - 1] = orders[i];
        orders[i] = order;
        i--;
      }
  }

  function addMarketOrder(
    bytes32 ticker, 
    uint amount, 
    Side side) 
    tokenExist(ticker)
    external {
      if (side == Side.SELL) {
        require(balances[msg.sender][ticker] >= amount, 'Token balance is too low');  
      }
      Order[] storage orders = books[ticker][uint(side == Side.BUY ? Side.SELL : Side.BUY)];
      uint i = 0;
      uint remaining = amount;
      /*
       * Create trades while:
       * - orderbook has unfilled orders 
       * - and market order amount is not filled 100%
       */
      while (i < orders.length && remaining > 0) {
        //solhint-disable-next-line max-line-length
        uint matched = (remaining > (orders[i].amount - orders[i].filled)) ? (orders[i].amount - orders[i].filled) : remaining; 
        remaining -= matched;
        orders[i].filled += matched; 
        trades[ticker].push(Trade(
          nextTradeId++,
          orders[i].user, 
          msg.sender,
          matched,
          orders[i].price,
          now //solhint-disable-line not-rely-on-time
        ));
        i++;
      }

      //Prune orderbook - filled orders must be removed
      i = 0;
      while (i < orders.length && orders[i].filled == orders[i].amount) {
        _shiftOrders(orders);
      }
    }

  function balanceOf(address _address, bytes32 ticker) 
    tokenExist(ticker)
    external
    view 
    returns(uint) {
      return balances[_address][ticker];
  }

  function getOrders(bytes32 ticker) 
    external 
    view 
    returns(Order[] memory, Order[] memory) {
      return (books[ticker][uint(Side.BUY)], books[ticker][uint(Side.SELL)]);
  }

  function getTrades(bytes32 ticker) 
    external 
    view 
    returns(Trade[] memory) {
      return (trades[ticker]);
  }

  function getTokens() 
    external 
    view 
    returns(Token[] memory) {
      Token[] memory _tokens = new Token[](tokenList.length);
      for (uint i = 0; i < tokenList.length; i++) {
        _tokens[i] = Token(
          tokens[tokenList[i]].ticker,
          tokens[tokenList[i]].at
        );
      }
      return _tokens;
  }

  function _shiftOrders(Order[] storage orders) internal {
    for (uint i = 0; i < orders.length - 1; i++) {
      orders[i] = orders[i + 1];
    }
    delete orders[orders.length - 1];
    orders.length--;
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
