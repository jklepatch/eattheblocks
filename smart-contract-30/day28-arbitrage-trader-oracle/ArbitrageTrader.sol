pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

import 'browser/Oracle.sol';
import 'browser/Dex.sol';

contract ArbitrageTrader {
    struct Asset {
        string sticker;
        address dex;
    }
    mapping(string => Asset) public assets;
    address public admin;
    address public oracle;
    
    constructor () public {
        admin = msg.sender;
    }
    
    function configureOracle(
        address _oracle) 
        external
        onlyAdmin() {
        oracle = _oracle;     
    }
    
    function configureAssets(Asset[] calldata _assets) 
        external
        onlyAdmin() {
        for(uint i = 0; i < _assets.length; i++) {
            assets[_assets[i].sticker] = Asset(_assets[i].sticker, _assets[i].dex);
        }
    }
    
    function maybeTrade(
        string calldata _sticker, 
        uint _date) 
        external
        onlyAdmin() {
        Asset storage asset = assets[_sticker];
        require(asset.dex != address(0), 'This asset does not exist');
        
        bytes32 dataKey = keccak256(abi.encodePacked(_sticker, _date));
        Oracle oracleContract = Oracle(oracle);
        Oracle.Result memory result = oracleContract.getData(dataKey);
        require(result.exist == true, 'This result does not exist, cant trade');
        require(result.approvedBy.length == 10, 'Not enough approvals for this data, cant trade');
        
        Dex dexContract = Dex(asset.dex);
        uint price = dexContract.getPrice(_sticker);
        if(price > result.payload) {
            dexContract.sell(_sticker, 100 , (99 * price) / 100); // fix amount
        } else {
            dexContract.buy(_sticker, 100, (101 * price) / 100); //fix amount
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, 'Only admin');
        _;
    }
}
