pragma solidity ^0.5.0;

import './IERC20.sol';
import './IERC1155.sol';

contract IConditionalTokens is IERC1155 {
    function prepareCondition(
        address oracle,
        bytes32 questionId, 
        uint outcomeSlotCount
    ) external;
    
    function reportPayouts(
        bytes32 questionId, 
        uint[] calldata payouts
    ) external;
    
    function splitPosition(
        IERC20 collateralToken,
        bytes32 parentCollectionId,
        bytes32 conditionId,
        uint[] calldata partition,
        uint amount
    ) external;
    
    function mergePositions(
        IERC20 collateralToken,
        bytes32 parentCollectionId,
        bytes32 conditionId,
        uint[] calldata partition,
        uint amount
    ) external;
    
    function redeemPositions(
        IERC20 collateralToken, 
        bytes32 parentCollectionId, 
        bytes32 conditionId, 
        uint[] calldata indexSets
    ) external;
    
    function getOutcomeSlotCount(
        bytes32 conditionId
    ) external view returns (uint);
    
    function getConditionId(
        address oracle, 
        bytes32 questionId, 
        uint outcomeSlotCount
    ) external pure returns (bytes32);
    
    function getCollectionId(
        bytes32 parentCollectionId, 
        bytes32 conditionId, 
        uint indexSet
    ) external view returns (bytes32);
    
    function getPositionId(
        IERC20 collateralToken, 
        bytes32 collectionId
    ) external pure returns (uint);
}
