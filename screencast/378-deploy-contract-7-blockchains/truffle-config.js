const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = ['0x + YOUR_PRIVATE_KEY_HERE'];
/**
 * Use this file to configure your truffle project. It's seeded with some * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    eth: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'ETH_NODE_URL'
      ),
      network_id: 1,
      skipDryRun: true
    },
    ethTestnet: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'ETH_NODE_URL'
      ),
      network_id: 5, //goerli
      skipDryRun: true
    },

    polygon: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://rpc-mainnet.matic.network'
      ),
      network_id: 137,
      skipDryRun: true
    },
    polygonTestnet: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://rpc-mumbai.maticvigil.com'
      ),
      network_id: 80001,
      skipDryRun: true
    },

    optimistic: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://mainnet.optimism.io'
      ),
      network_id: 10,
      skipDryRun: true
    },
    optimisticTestnet: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://kovan.optimism.io'
      ),
      gas: 10000000,
      gasPrice: 15000000,
      network_id: 69,
      skipDryRun: true
    },

    bsc: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://bsc-dataseed.binance.org/'
      ),
      network_id: 56,
      skipDryRun: true
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://data-seed-prebsc-1-s1.binance.org:8545/'
      ),
      network_id: 97,
      skipDryRun: true
    },
    
    heco: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://http-mainnet.hecochain.com'
      ),
      network_id: 128,
      skipDryRun: true
    },
    hecoTestnet: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://http-testnet.hecochain.com'
      ),
      network_id: 256,
      skipDryRun: true
    },

    kcc: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://rpc-mainnet.kcc.network'
      ),
      network_id: 321,
      skipDryRun: true
    },
    kccTestnet: {
      provider: () => new HDWalletProvider(
        privateKeys, 
        'https://rpc-testnet.kcc.network'
      ),
      network_id: 322,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: '0.8.6' 
      },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  //
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false
  }
};
