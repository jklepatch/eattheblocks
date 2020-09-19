pragma solidity ^0.7.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';
import './Token.sol';

contract ICO {
    using SafeMath for uint;
    struct Sale {
        address investor;
        uint amount;
        bool tokensWithdrawn;
    }
    mapping(address => Sale) public sales;
    address public admin;
    uint public end;
    uint public duration;
    uint public price;
    uint public availableTokens;
    uint public minPurchase;
    uint public maxPurchase;
    Token public token;
    IERC20 public dai = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    
    constructor(
        address tokenAddress,
        uint _duration,
        uint _price,
        uint _availableTokens,
        uint _minPurchase,
        uint _maxPurchase) {
        token = Token(tokenAddress);
        
        require(_duration > 0, 'duration should be > 0');
        require(
          _availableTokens > 0 && _availableTokens <= token.maxTotalSupply(), 
          '_availableTokens should be > 0 and <= maxTotalSupply'
        );
        require(_minPurchase > 0, '_minPurchase should > 0');
        require(
          _maxPurchase > 0 && _maxPurchase <= _availableTokens, 
          '_maxPurchase should be > 0 and <= _availableTokens'
        );

        admin = msg.sender;
        duration = _duration;
        price = _price;
        availableTokens = _availableTokens;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
    }
    
    function start()
        external
        onlyAdmin() 
        icoNotActive() {
        end = block.timestamp + duration;
    }
    
    function buy(uint daiAmount)
        external
        icoActive() {
        require(
          daiAmount >= minPurchase && daiAmount <= maxPurchase, 
          'have to buy between minPurchase and maxPurchase'
        );
        uint tokenAmount = daiAmount.div(price);
        require(
          tokenAmount <= availableTokens, 
          'Not enough tokens left for sale'
        );
        dai.transferFrom(msg.sender, address(this), daiAmount);
        token.mint(address(this), tokenAmount);
        sales[msg.sender] = Sale(
            msg.sender,
            tokenAmount,
            false
        );
    }
    
    function withdrawTokens()
        external
        icoEnded() {
        Sale storage sale = sales[msg.sender];
        require(sale.amount > 0, 'only investors');
        require(sale.tokensWithdrawn == false, 'tokens were already withdrawn');
        sale.tokensWithdrawn = true;
        token.transfer(sale.investor, sale.amount);
    }
    
    function withdrawDai(uint amount)
        external
        onlyAdmin()
        icoEnded() {
        dai.transfer(admin, amount);
    }
    
    modifier icoActive() {
        require(
          end > 0 && block.timestamp < end && availableTokens > 0, 
          'ICO must be active'
        );
        _;
    }
    
    modifier icoNotActive() {
        require(end == 0, 'ICO should not be active');
        _;
    }
    
    modifier icoEnded() {
        require(
          end > 0 && (block.timestamp >= end || availableTokens == 0), 
          'ICO must have ended'
        );
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin');
        _;
    }
}
