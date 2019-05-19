pragma solidity ^0.5.6;

contract Market {
    enum Status { //used both for Trade and Offer. For Trade 'DONE' means settled, and for
        PENDING,  // Offer it means the offer was taken already.
        DONE
    }
    struct Trade {
        uint id;
        uint offerId;
        address buyer;
        address seller;
        uint price;
        Status status;
    }
    struct Offer {
        uint id;
        address seller;
        string description;
        uint price;
        Status status;
    }
    mapping(uint => Trade) public trades;
    mapping(uint => Offer) public offers;
    mapping(address => uint) public balances;
    mapping(address => uint) public availableBalances; //take into consideration pending trades
    mapping(address => bool) public members;
    address admin;
    
    uint lastOfferId = 1;
    uint lastTradeId = 1;
    
    constructor() public {
        admin = msg.sender;
    }
    
    /*
     * Members functions
     */
    
    // called by seller
    function sell(string calldata description, uint price) 
        external 
        onlyMember(msg.sender, true) {
        require(price > 0, 'cannot sell free items');
        uint offerId = lastOfferId++;
        offers[offerId] = Offer(
            offerId, 
            msg.sender,
            description, 
            price, 
            Status.PENDING
        );
    }
    
    //called by buyer
    function buy(uint offerId)
        external 
        onlyMember(msg.sender, true) {
        Offer storage offer = offers[offerId];
        require(offer.id > 0, 'offer must exist');
        require(offer.status == Status.PENDING, 'offer must be pending');
        require(availableBalances[msg.sender] >= offer.price);
        availableBalances[msg.sender] -= offer.price;
        offer.status = Status.DONE;
        uint tradeId = lastTradeId++;
        trades[lastTradeId++] = Trade(
            tradeId, 
            offer.id, 
            msg.sender,
            offer.seller, 
            offer.price,
            Status.PENDING
        );
    }
        
    function deposit() 
        external 
        payable 
        onlyMember(msg.sender, true) {
        balances[msg.sender] += msg.value;
        availableBalances[msg.sender] += msg.value;
    }
    
    /*
     * Admin functions
     */
    
    function settle(uint txId) 
        external 
        onlyAdmin() {
        Trade storage trade = trades[txId];
        require(trade.id != 0, 'trade must exist');
        require(trade.status == Status.PENDING, 'trade must be in PENDING state');
        trade.status = Status.DONE;
        availableBalances[msg.sender] += trade.price;
        _transfer(trade.buyer, trade.seller, trade.price);
    }
    
    function register(address member) 
        external 
        onlyMember(member, false)
        onlyAdmin() {
        members[member] = true;
        balances[member] += 500;
        availableBalances[member] += 500;
    }
    
    function unregister(address member) 
        external 
        onlyMember(member, true)
        onlyAdmin() {
        uint memberBalance = balances[member];
        members[member] = false;
        _transfer(member, address(this), memberBalance);
    }
    
    function _transfer(address from, address to, uint amount) internal {
        require(balances[from] >= amount, 'cannot transfer more than current balance');
        balances[from] -= amount;
        availableBalances[from] -= amount;
        balances[to] += amount;
        availableBalances[to] += amount;
    }
    
    //Can send ether to smart contract
    function() external payable {}
    
    modifier onlyMember(address member, bool registered) {
        if(registered) {
            require(members[member] == true, 'must be registered');
        } else {
            require(members[member] == false, 'must NOT be registered');
        }
        _;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, 'only admin');
        _;
    }
}
