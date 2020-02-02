const Tweeter = artifacts.require("Tweeter");
//const namehash = require("eth-ens-namehash");

module.exports = async function(deployer, _network, accounts) {
  await deployer.ens.setAddress(
    "alice.name", accounts[0], { from: accounts[0] }
  );
  await deployer.ens.setAddress(
    "donald.name", accounts[1], { from: accounts[0] }
  );

  await deployer.deploy(Tweeter, deployer.ens.ensSettings.registryAddress);
  const tweeter = await Tweeter.deployed();

  // User 1
  await tweeter.tweet("Today I feel great!");
  await tweeter.tweet("Who want to party this weekend?");
  await tweeter.tweet("I HATE the butterfly keyboard of macbook pro...");

  // User 2
  await tweeter.tweet("I want to make America great again!", {from: "donald.name"});
  await tweeter.tweet("Build the wall!", {from: "donald.name"});

  //that's how you can retrieve the name associated to an address
  //console.log(await tweeter.resolve(namehash.hash('alice.name')));
  //console.log(await tweeter.resolve(namehash.hash('donald.name')));
};
