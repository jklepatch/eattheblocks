pragma solidity ^0.5.7;

import "./ERC721TOken";

contract Cryptokitty is ERC721Token {
  struct Kitty {
    uint id;
    uint generation;
    uint geneA;
    uint geneB;
  }

  mapping(uint => Kitty) private kitties;
  uint private nextId;

  constructor(string memory _name) ERC721Token(_name) {}

  function mintNew() external {
    mint(0, msg.sender, _random(10), _random(10));
  }

  function breed(uint kitty1Id, uint kitty2Id) external {
    require(kitty1Id < nextId 
            && kitty2Id < nextId, 'Must breed existing kitties');
    Kitty storage kitty1 = kitties[kitty1Id];
    Kitty storage kitty2 = kitties[kitty2Id];
    uint maxGen = kitty1.generation > kitty2.generation ? kitty1.generation : kitty2.generation; 
    uint gene1 = random(1) ? kitty1.gene1 : kitty2.gene1;
    uint gene2 = random(1) ? kitty1.gene2 : kitty2.gene2;
    mint(maxGen + 1, msg.sender, gene1, gene2);
  }

  function mint(uint generation, address owner, uint _gene1, uint _gene2) internal {
    kitties[nextId] = Kitty(nextId, generation, _gene1, _gene2);
    _mint(nextId, msg.sender)
    nextId++;
  }

  function _random(uint max) internal view returns(uint) {
    return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % max;
  }
}
