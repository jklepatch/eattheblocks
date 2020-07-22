const ethers = require('ethers');

const provider = ethers.getDefaultProvider('ropsten', {
  infura: 'REPLACE WITH YOUR INFURA KEY'
});

module.exports = provider;
