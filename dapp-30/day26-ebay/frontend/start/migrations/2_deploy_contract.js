const Ebay = artifacts.require("Ebay");

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(Ebay);
  const ebay = await Ebay.deployed();

  await ebay.createAuction(
    "My awesome cryptokitty 1",
    "My awesome cryptokitty 1 can dance, jump and even invest in crypto and make you tons of money. You should totally buy it!",
    1000, //min auction price, in wei
    86500 //duration in seconds, min is 1 day (86400)
  );
  await ebay.createAuction(
    "My awesome cryptokitty 2",
    "My awesome cryptokitty 2 can dance, jump and even invest in crypto and make you tons of money. You should totally buy it!",
    2000, //min auction price, in wei
    86500 //duration in seconds, min is 1 day (86400)
  );
  await ebay.createOffer(
    1,
    {value: 1000, from: accounts[1]}
  );
};
