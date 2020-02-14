const Tweeter = artifacts.require("Tweeter");

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(Tweeter);
  const tweeter = await Tweeter.deployed();

  // User 1
  await tweeter.tweet("Today I feel great!");
  await tweeter.tweet("Who want to party this weekend?");
  await tweeter.tweet("I HATE the butterfly keyboard of macbook pro...");

  // User 2
  await tweeter.tweet("I want to make America great again!", {from: accounts[1]});
  await tweeter.tweet("Build the wall!", {from: accounts[1]});
};
