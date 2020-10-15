// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract RFT is ERC20 {
  //ICO & shares
  uint public icoSharePrice;
  uint public icoShareSupply;
  uint public icoEnd;

  //NFT & DAI
  uint public nftId;
  IERC721 public nft;
  IERC20 public dai;

  //other
  address public admin;

  constructor(
    string memory _name,
    string memory _symbol,
    address _nftAddress, 
    uint _nftId,
    uint _icoSharePrice,
    uint _icoShareSupply,
    address _daiAddress
  ) 
  ERC20(_name, _symbol) 
  {
    nftId = _nftId;
    nft = IERC721(_nftAddress);
    icoSharePrice = _icoSharePrice; 
    icoShareSupply = _icoShareSupply;
    dai = IERC20(_daiAddress);
    admin = msg.sender;
  }

  function startIco() external {
    require(msg.sender == admin, 'only admin');
    nft.transferFrom(msg.sender, address(this), nftId);
    icoEnd = block.timestamp + 7 * 86400;
  }

  function buyShare(uint shareAmount) external {
    require(icoEnd > 0, 'ICO not started yet');
    require(block.timestamp <= icoEnd, 'ICO is finished');
    require(totalSupply() + shareAmount <= icoShareSupply, 'not enough shares left');
    uint daiAmount = shareAmount * icoSharePrice;
    dai.transferFrom(msg.sender, address(this), daiAmount);
    _mint(msg.sender, shareAmount);
  }

  function withdrawIcoProfits() external {
    require(msg.sender == admin, 'only admin');
    require(block.timestamp > icoEnd, 'ICO not finished yet'); 
    uint daiBalance = dai.balanceOf(address(this));
    if(daiBalance > 0) {
      dai.transfer(admin, daiBalance);
    }
    uint unsoldShareBalance = icoShareSupply - totalSupply();
    if(unsoldShareBalance > 0) {
      _mint(admin, unsoldShareBalance);
    }
  }
}
