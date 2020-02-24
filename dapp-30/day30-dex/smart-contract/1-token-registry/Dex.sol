pragma solidity 0.6.3;

contract Dex {
    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }
    
    mapping(bytes32 => Token) public tokens;
    bytes32[] public tokenList;
    mapping(address => mapping(bytes32 => uint)) public traderBalances;
    address public admin;
    
    constructor() public {
        admin = msg.sender;
    }
    
    function addToken(
        bytes32 ticker,
        address tokenAddress)
        onlyAdmin()
        external {
        tokens[ticker] = Token(ticker, tokenAddress);
        tokenList.push(ticker);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin');
        _;
    }
}
