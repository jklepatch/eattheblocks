pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../interfaces/INCT.sol";
import "../interfaces/INFT20Pair.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../interfaces/IFlashLoanReceiver.sol";
import "../interfaces/IUniswapV2Router.sol";

contract HashMaskFlash is IFlashLoanReceiver, IERC721Receiver {
    INCT public constant NCT = INCT(0x8A9c4dfe8b9D8962B31e4e16F8321C44d48e246E);
    IERC721 public constant HASHMASK =
        IERC721(0xC2C747E0F7004F9E8817Db2ca4997657a7746928);
    INFT20Pair public constant MASK20 =
        INFT20Pair(0xc2BdE1A2fA26890c8E6AcB10C91CC6D9c11F4a73);
    IUniswapV2Router public constant ROUTER_V2 =
        IUniswapV2Router(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);
    INFT20Pair public constant WETH =
        INFT20Pair(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);

    constructor() public {
        HASHMASK.setApprovalForAll(address(MASK20), true);
        NCT.approve(address(ROUTER_V2), uint256(-1));
    }

    function executeOperation(
        uint256[] calldata _ids,
        uint256[] calldata _amounts,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        NCT.claim(_ids);
        // Sell it on uniswap
        address[] memory uni_path = new address[](2);
        uni_path[0] = address(NCT);
        uni_path[1] = address(WETH);
        ROUTER_V2.swapExactTokensForTokens(
            NCT.balanceOf(address(this)),
            0,
            uni_path,
            address(this),
            block.timestamp + 1
        );
        // Transfer back wETH
        WETH.transfer(
            address(0x6fBa46974b2b1bEfefA034e236A32e1f10C5A148),
            (WETH.balanceOf(address(this)) * 10) / 100
        ); //transfer 10% to dao
        WETH.transfer(initiator, WETH.balanceOf(address(this)));
        return true;
    }

    function onERC721Received(
        address operator,
        address,
        uint256,
        bytes memory data
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
