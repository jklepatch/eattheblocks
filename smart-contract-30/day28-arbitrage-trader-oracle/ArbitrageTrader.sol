pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

import 'browser/Dex.sol';
import 'browser/Oracle.sol';

contract ArbitrageTrader {
    struct Asset {
        string name;
        address dex;
    }
    mapping(string => Asset) public assets;
    address public admin;
    address public oracle;
    
    constructor() public {
        admin = msg.sender;
    }
    
    function configureOracle(address _oracle) external onlyAdmin() {
        oracle = _oracle;
    }
    
    function configureAssets(Asset[] calldata _assets) external onlyAdmin() {
        for(uint i = 0; i < _assets.length; i++) {
            assets[_assets[i].name] = Asset(_assets[i].name, _assets[i].dex);
        }
    }
    
    function maybeTrade(
        string calldata _sticker,
        uint _date)
        external
        onlyAdmin() {
        Asset storage asset = assets[_sticker];
        require(asset.dex != address(0), 'This asset does not exist');
        
        // Get latest price of asset from oracle
        bytes32 dataKey = keccak256(abi.encodePacked(_sticker, _date));
        Oracle oracleContract = Oracle(oracle);
        Oracle.Result memory result = oracleContract.getData(dataKey);
        require(result.exist == true, 'This result does not exist, cannot trade');
        require(result.approvedBy.length == 10, 'Not enough approvals for this result, cannot trade');
        
        //If there is a price, trade of the dex
        Dex dexContract = Dex(asset.dex);
        uint price = dexContract.getPrice(_sticker);
        uint amount = 1 ether / price;
        if(price > result.payload) {
            dexContract.sell(_sticker, amount, (99 * price) / 100);
        } else if(price < result.payload) {
            dexContract.buy(_sticker, amount, (101 * price) / 100);
        }
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin');
        _;
    }
}
