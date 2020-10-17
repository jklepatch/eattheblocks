const ERC1155 = artifacts.require("ERC1155OpenZeppelin.sol");

module.exports = function (deployer) {
  deployer.deploy(ERC1155);
};
