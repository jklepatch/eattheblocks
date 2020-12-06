pragma solidity ^0.7.3;

import '@openzeppelin/contracts/tokens/ERC20/IERC20.sol';
import './IYearn.sol';

contract UBI {
  IERC20 public dai;
  mapping(address => uint) public beneficiaries;
  address public admin;

  constructor(address _dai, address _yearn) {
    dai = IERC20(_dai); 
    yearn = IYearn(_yearn);
    admin = msg.sender;
  }

  function addBeneficiary(address beneficiary, uint startBlock) external {
    beneficiaries[beneficiary] = startBlock; 
  }

  function finance(uint amount) {
    require(msg.sender == admin, 'only admin');
    dai.transferFrom(msg.sender, address(this), amount);
  }

  function claim() external {
    uint checkpoint = beneficiaires[msg.sender];
    require(checkpoint > 0, 'Must be a beneficiary');
    require(checkpoint < block.timestamp, 'no pending payments');
    uint amount = (block.timestamp - beneficiaries) * dao.paymentPerBlock(); 
    yearn.withdraw(amount);
    dai.transfer(amount);
  }
}
