//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IFlashLoanReceiver {
    function executeOperation(
        uint256[] calldata _ids,
        uint256[] calldata _amounts,
        address initiator,
        bytes calldata params
    ) external returns (bool);
}
