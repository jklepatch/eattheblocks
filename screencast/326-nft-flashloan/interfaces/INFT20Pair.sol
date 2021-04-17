pragma solidity ^0.8.0;

// Interface for our erc20 token
interface INFT20Pair {
    function totalSupply() external view returns (uint256);

    function balanceOf(address tokenOwner)
        external
        view
        returns (uint256 balance);

    function allowance(address tokenOwner, address spender)
        external
        view
        returns (uint256 remaining);

    function transfer(address to, uint256 tokens)
        external
        returns (bool success);

    function approve(address spender, uint256 tokens)
        external
        returns (bool success);

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) external returns (bool success);

    function mint(address to, uint256 amount) external;

    function burn(uint256 amount) external;

    function burnFrom(address account, uint256 amount) external;

    function nftType() external view returns (uint256);

    function nftAddress() external view returns (address);

    function track1155(uint256 _id) external view returns (uint256);

    function setParams(
        uint256 _nftType,
        string calldata name,
        string calldata symbol,
        uint256 value
    ) external;

    function getInfos()
        external
        view
        returns (
            uint256 _type,
            string memory _name,
            string memory _symbol,
            uint256 _supply
        );

    function init(
        string calldata name,
        string calldata symbol,
        address _nftAddress,
        uint256 _nftType
    ) external;
}
