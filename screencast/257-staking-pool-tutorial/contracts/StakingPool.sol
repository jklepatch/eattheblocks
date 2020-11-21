pragma solidity ^0.7.5;

interface IDepositContract {
    function deposit(
        bytes calldata pubkey,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    ) external payable;
}

contract StakingPool {
    mapping(address => uint) public balances;
    mapping(bytes => bool) public pubkeysUsed;
    IDepositContract public depositContract = IDepositContract(0x00000000219ab540356cBB839Cbe05303d7705Fa);
    address public admin;
    uint public end;
    bool public finalized;
    uint public totalInvested;
    uint public totalChange;
    mapping(address => bool) public changeClaimed;
    
    event NewInvestor (
        address investor
    );

    constructor() {
        admin = msg.sender;
        end = block.timestamp + 7 days;
    }
    
    function invest() external payable {
        require(block.timestamp < end, 'too late');
        if(balances[msg.sender] == 0) {
            emit NewInvestor(msg.sender);   
        }
        balances[msg.sender] += msg.value;
    }

    function finalize() external {
      require(block.timestamp >= end, 'too early');
      require(finalized == false, 'already finalized');
      finalized = true;
      totalInvested = address(this).balance;
      totalChange = address(this).balance % 32 ether;
    }

    function getChange() external {
      require(finalized == true, 'not finalized');
      require(balances[msg.sender] > 0, 'not an investor');
      require(changeClaimed[msg.sender] == false, 'change already claimed');
      changeClaimed[msg.sender] = true;
      uint amount = totalChange * balances[msg.sender] / totalInvested;
      msg.sender.send(amount);
    }
    
    function deposit(
        bytes calldata pubkey,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    )
        external
    {
        require(finalized == true, 'too early');
        require(msg.sender == admin, 'only admin');
        require(address(this).balance >= 32 ether);
        require(pubkeysUsed[pubkey] == false, 'this pubkey was already used');
        depositContract.deposit{value: 32 ether}(
            pubkey, 
            withdrawal_credentials, 
            signature, 
            deposit_data_root
        );
    }
}
