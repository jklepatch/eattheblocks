const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  compilers: {
    solc: {
      version: '0.5.10'
    }
  },
  networks: {
    develop: {
      port: 8545
    }
  }
};
