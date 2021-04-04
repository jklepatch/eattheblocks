pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import "../interfaces/IFlashLoanReceiver.sol";

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

//Console log for debug
//import "hardhat/console.sol";

contract MemeFlash is IFlashLoanReceiver, ERC1155Receiver {
    IERC1155 public constant MEME_NFT =
        IERC1155(0xe4605d46Fd0B3f8329d936a8b258D69276cBa264);

    constructor() public {
        MEME_NFT.setApprovalForAll(
            address(0x60ACD58d00b2BcC9a8924fdaa54A2F7C0793B3b2),
            true
        );
    }

    function executeOperation(
        uint256[] calldata _ids,
        uint256[] calldata _amounts,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        return true;
    }

    function onERC1155BatchReceived(
        address operator,
        address,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public virtual override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function onERC1155Received(
        address operator,
        address,
        uint256,
        uint256 value,
        bytes memory data
    ) public virtual override returns (bytes4) {
        return this.onERC1155Received.selector;
    }
}
