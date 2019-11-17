pragma solidity ^0.5.7;

import { ERC20Token } from './ERC20Token.sol';

contract ICO {
    struct Sale {
        address investor;
        uint quantity;
    }
    Sale[] public sales;
    mapping(address => bool) public investors;
    address public token;
    address public admin;
    uint public end;
    uint public price;
    uint public availableTokens;
    uint public minPurchase;
    uint public maxPurchase;
    bool public released;
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint _totalSupply)
        public {
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
        icoNotActive() {
        require(duration > 0, 'duration should be > 0');
        uint totalSupply = ERC20Token(token).totalSupply();
        require(_availableTokens > 0 && _availableTokens <= totalSupply, 'totalSupply should be > 0 and <= totalSupply');
        require(_minPurchase > 0, '_minPurchase should > 0');
        require(_maxPurchase > 0 && _maxPurchase <= _availableTokens, '_maxPurchase should be > 0 and <= _availableTokens');
        end = duration + now; 
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
        icoActive() {
        require(msg.value % price == 0, 'have to send a multiple of price');
        require(msg.value >= minPurchase && msg.value <= maxPurchase, 'have to send between minPurchase and maxPurchase');
        uint quantity = price * msg.value;
        require(quantity <= availableTokens, 'Not enough tokens left for sale');
        sales.push(Sale(
            msg.sender,
            quantity
        ));
        availableTokens -= quantity;
    }
    
    function release()
        external
        onlyAdmin()
        icoEnded()
        tokensNotReleased() {
        ERC20Token tokenInstance = ERC20Token(token);
        for(uint i = 0; i < sales.length; i++) {
            Sale storage sale = sales[i];
            tokenInstance.transfer(sale.investor, sale.quantity);
        }
        released = true;
    }
    
    function withdraw(
        address payable to,
        uint amount)
        external
        onlyAdmin()
        icoEnded()
        tokensReleased() {
        to.transfer(amount);    
    }
    
    modifier icoActive() {
        require(end > 0 && now < end && availableTokens > 0, "ICO must be active");
        _;
    }
    
    modifier icoNotActive() {
        require(end == 0, 'ICO should not be active');
        _;
    }
    
    modifier icoEnded() {
        require(end > 0 && (now >= end || availableTokens == 0), 'ICO must have ended');
        _;
    }
    
    modifier tokensNotReleased() {
        require(released == false, 'Tokens must NOT have been released');
        _;
    }
    
    modifier tokensReleased() {
        require(released == true, 'Tokens must have been released');
        _;
    }
    
    modifier onlyInvestors() {
        require(investors[msg.sender] == true, 'only investors');
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin');
        _;
    }
    
}
