pragma solidity ^0.5.7;
import 'browser/ERC721Token1.sol';

contract Cryptokitty is ERC721Token {
    struct Kitty {
        uint id;
        uint generation;
        uint geneA;
        uint geneB;
    }
    mapping(uint => Kitty) private kitties;
    uint public nextId;
    address public admin;
    
    constructor(
        string memory _name,
        string memory _symbol,
        string memory _tokenURIBase) ERC721Token(_name, _symbol, _tokenURIBase) public {
            admin = msg.sender;
    }
    
    function breed(uint kitty1Id, uint kitty2Id) external {
        require(kitty1Id < nextId && kitty2Id < nextId, 'The 2 kitties must exist');
        Kitty storage kitty1 = kitties[kitty1Id];
        Kitty storage kitty2 = kitties[kitty2Id];
        require(ownerOf(kitty1Id) == msg.sender && ownerOf(kitty2Id) == msg.sender, 'msg.sender must own the 2 kitties');
        uint maxGen = kitty1.generation > kitty2.generation ? kitty1.generation : kitty2.generation;
        uint geneA = _random(4) > 1 ? kitty1.geneA : kitty2.geneA;
        uint geneB = _random(4) > 1 ? kitty1.geneB : kitty2.geneB;
        kitties[nextId] = Kitty(nextId, maxGen, geneA ,geneB) ;
        _mint(nextId, msg.sender);
        nextId++;
    }
   
    function mint() external {
        require(msg.sender == admin, 'only admin');
        kitties[nextId] = Kitty(nextId, 1, _random(10), _random(10));
        _mint(nextId, msg.sender);
        nextId++;
    } 
    
    function _random(uint max) internal view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % max;
    }
}
