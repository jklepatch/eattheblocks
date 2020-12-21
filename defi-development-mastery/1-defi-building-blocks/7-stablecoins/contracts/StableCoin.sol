pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

// WIP
contract StableCoin is ERC20 {
  address public oracle;
  uint public targetPrice = 10 ** 18; //1 token = 10 ** 18 = 1 USD
  uint public initialSupply = 1000000 * 10 * 18; //100,000 tokens
  uint public treasury = 10000; //10,000 tokens

  struct Position {
    uint collateral;
    uint token;
  }
  mapping(address => Position) public positions;
  uint public collatFactor = 150;  

  constructor(address _oracle) ERC20 {
    oracle = _oracle;
    _mint(msg.sender, initialSupply); 
  }

  function adjustSupply(uint price) external {
    require(msg.sender == oracle, 'only oracle');
    if(price > targetPrice) {
      //(totalSupply + toMint) * targetPrice = totalSupply * currentPrice 
      uint toMint = totalSupply * currentPrice / targetPrice - totalSupply;
      _mint(address(this), toMint);
    } else {
      //(totalSupply - toBurn) * targetPrice = totalSupply * currentPrice 
      uint toBurn = totalSupply - totalSupply * currentPrice / targetPrice;
      _burn(address(this), toBurn);
    }
  }

  function borrowPosition(uint amount) external payable {
    uint etherPrice = oracle.getEtherPrice();
    require(amount > 10 ** 18, 'amount too low');
    require(msg.value * 100 >= etherPrice * amount * collatFactor);
    positions[msg.sender].collateral += msg.value;
    positions[msg.sender].token += amount; 
    _mint(msg.sender, amount);
  }

  function redeemPosition(uint amount) external payable {
    uint etherPrice = oracle.getEtherPrice();

    require(amount > 10 ** 18, 'amount too low');
    require(msg.value * 100 >= etherPrice * amount * collatFactor);
    positions[msg.sender].collateral += msg.value;
    positions[msg.sender].token += amount; 
    _burn(msg.sender, amount);
  }

  function liquidatePosition(address owner, uint amount) external {
    Position storage position = positions[owner];
    uint etherPrice = oracle.getEtherPrice();
    require(position.token * collatFactor < position.collateral * etherPrice, 'not liquidatable');  
    _burn(msg.sender, position.token);
    msg.sender.transfer(position.collateral);
    position.token = 0;
    position.collateral = 0;
  }
}
