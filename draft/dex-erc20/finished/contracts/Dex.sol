pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';


contract Dex {
  struct Token {
    uint id;
    bytes32 symbol;
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
  mapping(bytes32 => mapping(uint => Order[])) private books;
  mapping(bytes32 => Trade[]) private trades;
  uint private nextTokenId;
  uint private nextOrderId;
  uint private nextTradeId;

  constructor(bytes32[] memory symbols, address[] memory ats) public {
    for (uint i = 0; i < symbols.length; i++) {
      tokens[symbols[i]] = Token(nextTokenId++, symbols[i], ats[i]);
      tokenList.push(symbols[i]);
    }
  }

  function deposit(uint amount, bytes32 symbol) external {
    IERC20(tokens[symbol].at).transferFrom(msg.sender, address(this), amount);
    balances[msg.sender][symbol] += amount;
  }

  function withdraw(uint amount, bytes32 symbol, address to) external {
    require(balances[msg.sender][symbol] >= amount);
    balances[msg.sender][symbol] -= amount;
    IERC20(tokens[symbol].at).transfer(to, amount);
  }

  function addLimitOrder(
    bytes32 token, 
    uint amount, 
    uint price, 
    Side side) 
    external {
      require(tokens[token].at != address(0), 'This token does not exist');
      if (side == Side.SELL) {
        require(balances[msg.sender][token] >= amount, 'Token balance is too low');  
      } else {
        require(balances[msg.sender][bytes32('WETH')] >= amount * price, 'WETH balance is too low');
      }
      Order[] storage orders = books[token][uint(side)];
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
    bytes32 token, 
    uint amount, 
    uint price, 
    Side side) 
    external {
      require(tokens[token].at != address(0), 'This token does not exist');
      if (side == Side.SELL) {
        require(balances[msg.sender][token] >= amount, 'Token balance is too low');  
      }
      Order[] storage orders = books[token][uint(side == Side.BUY ? Side.SELL : Side.BUY)];
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
        trades[token].push(Trade(
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

  function balanceOf(address _address, bytes32 symbol) 
    external
    view 
    returns(uint) {
      return balances[_address][symbol];
    }

  function getOrders(bytes32 token) 
    external 
    view 
    returns(Order[] memory, Order[] memory) {
      return (books[token][uint(Side.BUY)], books[token][uint(Side.SELL)]);
    }

  function getTrades(bytes32 token) 
    external 
    view 
    returns(Trade[] memory) {
      return (trades[token]);
    }

  function getTokens() 
    external 
    view 
    returns(Token[] memory) {
      Token[] memory _tokens = new Token[](tokenList.length);
      for (uint i = 0; i < tokenList.length; i++) {
        _tokens[i] = Token(
          tokens[tokenList[i]].id,
          tokens[tokenList[i]].symbol,
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
}
