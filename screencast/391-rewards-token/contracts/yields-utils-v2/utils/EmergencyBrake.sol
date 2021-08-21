// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "../access/AccessControl.sol";


interface IEmergencyBrake {
    function plan(address target, address[] calldata contacts, bytes4[][] calldata permissions) external returns (bytes32 txHash);
    function cancel(bytes32 txHash) external;
    function execute(address target, address[] calldata contacts, bytes4[][] calldata permissions) external;
    function restore(address target, address[] calldata contacts, bytes4[][] calldata permissions) external;
    function terminate(bytes32 txHash) external;
}

/// @dev EmergencyBrake allows to plan for and execute transactions that remove access permissions for a target
/// contract. In an permissioned environment this can be used for pausing components.
/// All contracts in scope of emergency plans must grant ROOT permissions to EmergencyBrake. To mitigate the risk
/// of governance capture, EmergencyBrake has very limited functionality, being able only to revoke existing roles
/// and to restore previously revoked roles. Thus EmergencyBrake cannot grant permissions that weren't there in the 
/// first place. As an additional safeguard, EmergencyBrake cannot revoke or grant ROOT roles.
/// In addition, there is a separation of concerns between the planner and the executor accounts, so that both of them
/// must be compromised simultaneously to execute non-approved emergency plans, and then only creating a denial of service.
contract EmergencyBrake is AccessControl, IEmergencyBrake {
    enum State {UNPLANNED, PLANNED, EXECUTED}

    event Planned(bytes32 indexed txHash, address target, address[] contacts, bytes4[][] permissions);
    event Cancelled(bytes32 indexed txHash);
    event Executed(bytes32 indexed txHash, address target, address[] contacts, bytes4[][] permissions);
    event Restored(bytes32 indexed txHash, address target, address[] contacts, bytes4[][] permissions);
    event Terminated(bytes32 indexed txHash);

    mapping (bytes32 => State) public plans;

    constructor(address planner, address executor) AccessControl() {
        _grantRole(IEmergencyBrake.plan.selector, planner);
        _grantRole(IEmergencyBrake.cancel.selector, planner);
        _grantRole(IEmergencyBrake.execute.selector, executor);
        _grantRole(IEmergencyBrake.restore.selector, planner);
        _grantRole(IEmergencyBrake.terminate.selector, planner);

        // Granting roles (plan, cancel, execute, restore, terminate) is reserved to ROOT
    }

    /// @dev Register an access removal transaction
    function plan(address target, address[] calldata contacts, bytes4[][] calldata permissions)
        external override auth
        returns (bytes32 txHash)
    {
        require(contacts.length == permissions.length, "Mismatched inputs");
        // Removing or granting ROOT permissions is out of bounds for EmergencyBrake
        for (uint256 i = 0; i < contacts.length; i++){
            for (uint256 j = 0; j < permissions[i].length; j++){
                require(
                    permissions[i][j] != ROOT,
                    "Can't remove ROOT"
                );
            }
        }
        txHash = keccak256(abi.encode(target, contacts, permissions));
        require(plans[txHash] == State.UNPLANNED, "Emergency already planned for.");
        plans[txHash] = State.PLANNED;
        emit Planned(txHash, target, contacts, permissions);
    }

    /// @dev Erase a planned access removal transaction
    function cancel(bytes32 txHash)
        external override auth
    {
        require(plans[txHash] == State.PLANNED, "Emergency not planned for.");
        plans[txHash] = State.UNPLANNED;
        emit Cancelled(txHash);
    }

    /// @dev Execute an access removal transaction
    function execute(address target, address[] calldata contacts, bytes4[][] calldata permissions)
        external override auth
    {
        bytes32 txHash = keccak256(abi.encode(target, contacts, permissions));
        require(plans[txHash] == State.PLANNED, "Emergency not planned for.");
        plans[txHash] = State.EXECUTED;

        for (uint256 i = 0; i < contacts.length; i++){
            // AccessControl.sol doesn't revert if revoking permissions that haven't been granted
            // If we don't check, planner and executor can collude to gain access to contacts
            for (uint256 j = 0; j < permissions[i].length; j++){
                require(
                    AccessControl(contacts[i]).hasRole(permissions[i][j], target),
                    "Permission not found"
                );
            }
            // Now revoke the permissions
            AccessControl(contacts[i]).revokeRoles(permissions[i], target);
        }
        emit Executed(txHash, target, contacts, permissions);
    }

    /// @dev Restore the orchestration from an isolated target
    function restore(address target, address[] calldata contacts, bytes4[][] calldata permissions)
        external override auth
    {
        bytes32 txHash = keccak256(abi.encode(target, contacts, permissions));
        require(plans[txHash] == State.EXECUTED, "Emergency plan not executed.");
        plans[txHash] = State.PLANNED;

        for (uint256 i = 0; i < contacts.length; i++){
            AccessControl(contacts[i]).grantRoles(permissions[i], target);
        }
        emit Restored(txHash, target, contacts, permissions);
    }

    /// @dev Remove the restoring option from an isolated target
    function terminate(bytes32 txHash)
        external override auth
    {
        require(plans[txHash] == State.EXECUTED, "Emergency plan not executed.");
        plans[txHash] = State.UNPLANNED;
        emit Terminated(txHash);
    }
}