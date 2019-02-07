const Storage = artifacts.require("Storage");
Storage.deployed()
  .then((storage) => {
    return storage.set("my data")
   })
   .then((result) => {
     console.log(result);
   });

module.exports = function(deployer) {
  deployer.deploy(Storage);
};
