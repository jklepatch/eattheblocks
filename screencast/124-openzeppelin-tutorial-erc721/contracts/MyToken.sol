pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol';
//import '@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol';
//import '@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721Holder.sol';

contract MyContract is ERC721, ERC721Burnable {
  constructor() public {}

  pause()
  unpause()
}



contract MyOtherContract {
  function foo() external {
    IERC721(0x.......).transfer()....
  }
}


contract MyERC721Holder is ERC721Holder {}
