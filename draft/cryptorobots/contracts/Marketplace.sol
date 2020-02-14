pragma solidity ^0.4.24;

import './CryptoRobots.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Marketplace is Ownable {
    
    modifier onlyCryptoRobots() {
        require(msg.sender == address(robotsContract));
        _;
    }
    
    struct Order {
        uint price;
        address seller;
        uint timestamp;
        bool exists;
    }
    
    event SellOrder(address owner, uint robotId, uint price);
    event Bought(uint robotId, address buyer, uint price);
    event Canceled(address owner, uint robotId);
    
    uint public numOrders;
    uint public ownerBalance;
    
    uint public constant OWNERS_CUT = 3; // 3 percent of every sale goes to owner
    
    mapping (uint => Order) public sellOrders;
    mapping(uint => uint) public positionOfJingle;
    
    uint[] public robotsOnSale;
    
    CryptoRobots public robotsContract;
    
    function Marketplace(address _robotsAddress) public {
        robotsContract = CryptoRobots(_robotsAddress);
        ownerBalance = 0;
    }

    function sell(address _owner, uint _robotId, uint _amount) public onlyCryptoRobots {
        require(sellOrders[_robotId].exists == false, "The sales order needs to exist");
        
        sellOrders[_robotId] = Order({
           price: _amount,
           seller: _owner,
           timestamp: now,
           exists: true
        });
        
        numOrders++;
        
        // set for iterating
        robotsOnSale.push(_robotId);
        positionOfJingle[_robotId] = robotsOnSale.length - 1;
        
        //transfer ownership 
        robotsContract.transferFrom(_owner, this, _robotId);
        
        //Fire an sell event
        SellOrder(_owner, _robotId, _amount);
    }
    
    function buy(uint _robotId) public payable {
        require(sellOrders[_robotId].exists == true, "The sales order needs to exist");
        require(msg.value >= sellOrders[_robotId].price, "The buyer must pay the required price or more");
        
        sellOrders[_robotId].exists = false;
        
        numOrders--;
        
        //delete stuff for iterating 
        removeOrder(_robotId);
        
        //transfer ownership 
        robotsContract.transfer(msg.sender, _robotId);
        
        // transfer money to seller
        uint price = sellOrders[_robotId].price;
        
        uint threePercent = (price / 100) * OWNERS_CUT;
        
        sellOrders[_robotId].seller.transfer(price - threePercent);
        
        ownerBalance += threePercent;
        
        //fire and event
        Bought(_robotId, msg.sender, msg.value);
    }
    
    function cancel(uint _robotId) public {
        require(sellOrders[_robotId].exists == true, "The sales order needs to exist");
        require(sellOrders[_robotId].seller == msg.sender, "The caller must be the owner of the sale");
        
        sellOrders[_robotId].exists = false;
        
        numOrders--;
        
        //delete stuff for iterating 
        removeOrder(_robotId);
        
        robotsContract.transfer(msg.sender, _robotId);
        
        //fire and event
        Canceled(msg.sender, _robotId);
    }
    
    function removeOrder(uint _robotId) internal {
        uint length = robotsOnSale.length;
        uint index = positionOfJingle[_robotId];
        uint lastOne = robotsOnSale[length - 1];

        robotsOnSale[index] = lastOne;
        positionOfJingle[lastOne] = index;

        delete robotsOnSale[length - 1];
        robotsOnSale.length--;
    }
    
    function getAllrobotsOnSale() public view returns(uint[]) {
        return robotsOnSale;
    }
    
    //Owners functions 
    function withdraw(uint _amount) public onlyOwner {
        require(_amount <= ownerBalance, "Owner can't withdraw more than his balance is");

        ownerBalance -= _amount;
        msg.sender.transfer(_amount);
    }
    
}