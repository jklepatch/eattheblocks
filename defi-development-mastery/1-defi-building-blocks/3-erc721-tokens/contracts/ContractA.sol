pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC721/ERC721Holder.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

contract ContractB is ERC721Holder {
  function deposit(uint tokenId) external {}
  function withdraw(uint tokenId) external {}
}

contract ContractA is ERC721Holder {
  IERC721 public token;
  ContractB public contractB;

  constructor(address _token, address _contractB) {
    token = IERC721(_token);
    contractB = ContractB(_contractB); 
  }

  function deposit(uint tokenId) external {
    token.safeTransferFrom(msg.sender, address(this), tokenId);
    token.approve(address(contractB), tokenId);
    contractB.deposit(tokenId);
  }

  function withdraw(uint tokenId) external {
    contractB.withdraw(tokenId);
    token.safeTransferFrom(address(this), msg.sender, tokenId);
  }

}
