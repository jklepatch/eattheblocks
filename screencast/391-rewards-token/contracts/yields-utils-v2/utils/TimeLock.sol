// SPDX-License-Identifier: MIT
// Inspired on TimeLock.sol from Compound.

pragma solidity ^0.8.0;
import "../access/AccessControl.sol";
import "./RevertMsgExtractor.sol";
import "./IsContract.sol";

interface ITimeLock {
    function setDelay(uint256 delay_) external;
    function schedule(address[] calldata targets, bytes[] calldata data, uint256 eta) external returns (bytes32 txHash);
    function cancel(bytes32 txHash) external;
    function execute(address[] calldata targets, bytes[] calldata data) external returns (bytes[] calldata results);
}

contract TimeLock is ITimeLock, AccessControl {
    using IsContract for address;

    uint256 public constant GRACE_PERIOD = 14 days;
    uint256 public constant MINIMUM_DELAY = 2 days;
    uint256 public constant MAXIMUM_DELAY = 30 days;

    event DelaySet(uint256 indexed delay);
    event Cancelled(bytes32 indexed txHash);
    event Executed(bytes32 indexed txHash, address[] targets, bytes[] data);
    event Scheduled(bytes32 indexed txHash, address[] targets, bytes[] data, uint256 eta);

    uint256 public delay;
    mapping (bytes32 => uint256) public transactions;

    constructor(address scheduler, address executor) AccessControl() {
        delay = MINIMUM_DELAY;

        // scheduler can schedule and cancel, executor can execute
        _grantRole(ITimeLock.schedule.selector, scheduler); // bytes4(keccak256("schedule(address[],bytes[],uint256)"))
        _grantRole(ITimeLock.cancel.selector, scheduler); // bytes4(keccak256("cancel(address[],bytes[],uint256)"))
        _grantRole(ITimeLock.execute.selector, executor); // bytes4(keccak256("execute(address[],bytes[],uint256)"))

        // Changing the delay must now be executed through this TimeLock contract
        _grantRole(ITimeLock.setDelay.selector, address(this)); // bytes4(keccak256("setDelay(uint256)"))

        // Granting roles (schedule, cancel, execute, setDelay) must now be executed through this TimeLock contract
        _grantRole(ROOT, address(this));
        _revokeRole(ROOT, msg.sender);
    }

    /// @dev Change the delay for queueing and executing transactions
    function setDelay(uint256 delay_) external override auth {
        require(delay_ >= MINIMUM_DELAY, "Must exceed minimum delay.");
        require(delay_ <= MAXIMUM_DELAY, "Must not exceed maximum delay.");
        delay = delay_;

        emit DelaySet(delay_);
    }

    /// @dev Schedule a transaction batch for execution between `eta` and `eta + GRACE_PERIOD`
    function schedule(address[] calldata targets, bytes[] calldata data, uint256 eta)
        external override auth returns (bytes32 txHash)
    {
        require(targets.length == data.length, "Mismatched inputs");
        require(eta >= block.timestamp + delay, "Must satisfy delay."); // This also prevents setting eta = 0 and messing up the state
        txHash = keccak256(abi.encode(targets, data));
        require(transactions[txHash] == 0, "Transaction already scheduled.");
        transactions[txHash] = eta;
        emit Scheduled(txHash, targets, data, eta);
    }

    /// @dev Cancel a scheduled transaction batch
    function cancel(bytes32 txHash)
        external override auth
    {
        require(transactions[txHash] != 0, "Transaction hasn't been scheduled.");
        delete transactions[txHash];
        emit Cancelled(txHash);
    }

    /// @dev Execute a transaction batch
    function execute(address[] calldata targets, bytes[] calldata data)
        external override auth returns (bytes[] memory results)
    {
        bytes32 txHash = keccak256(abi.encode(targets, data));
        uint256 eta = transactions[txHash];

        require(eta != 0, "Transaction hasn't been scheduled.");
        require(block.timestamp >= eta, "ETA not reached.");
        require(block.timestamp <= eta + GRACE_PERIOD, "Transaction is stale.");

        delete transactions[txHash];

        results = new bytes[](targets.length);
        for (uint256 i = 0; i < targets.length; i++){
            require(targets[i].isContract(), "Call to a non-contract");
            (bool success, bytes memory result) = targets[i].call(data[i]);
            if (!success) revert(RevertMsgExtractor.getRevertMsg(result));
            results[i] = result;
        }
        emit Executed(txHash, targets, data);
    }
}