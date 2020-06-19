// const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider")
require("dotenv").config()

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration> to customize your Truffle configuration!
	// contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
	  development: {
	    host: "127.0.0.1",
	    port: 8545,
	    // gas: 20000000,
	    network_id: "*",
	    skipDryRun: true
	  },
	  ropsten: {
	    provider: new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
	    network_id: 3,
	    gas: 5000000,
		gasPrice: 5000000000, // 5 Gwei
		skipDryRun: true
	  },
	  kovan: {
      provider: new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "wss://kovan.infura.io/ws/v3/" + process.env.INFURA_API_KEY),
	    network_id: 42,
	    gas: 5000000,
		gasPrice: 5000000000, // 5 Gwei
		skipDryRun: true
	  },
	  mainnet: {
	    provider: new HDWalletProvider(process.env.DEPLOYMENT_ACCOUNT_KEY, "https://mainnet.infura.io/" + process.env.INFURA_API_KEY),
	    network_id: 1,
	    gas: 5000000,
	    gasPrice: 5000000000 // 5 Gwei
	  }
	},
	compilers: {
		solc: {
			version: "^0.6.6",
		},
	},
}
