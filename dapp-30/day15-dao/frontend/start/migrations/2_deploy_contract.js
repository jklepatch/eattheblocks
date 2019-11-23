const DAO = artifacts.require("DAO");

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(DAO, 2, 30, 2);
  const dao = await DAO.deployed();
  await Promise.all([
    dao.contribute({from: accounts[1], value: 100}),
    dao.contribute({from: accounts[2], value: 1000}),
    dao.contribute({from: accounts[3], value: 2000})
  ]);
  await dao.createProposal(
    "proposal 1", 
    100, 
    accounts[9],
    {from: accounts[1]}
  );
};
