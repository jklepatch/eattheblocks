const Web3 = require('web3');
const axios = require('axios');
const EthDater = require('ethereum-block-by-date');

const init = async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
  const dater = new EthDater(web3);
  const [startBlock, endBlock] = await Promise.all([
    dater.getDate(process.env.START_DATE, true),
    dater.getDate(process.env.END_DATE, true)
  ]);

  const getTokenTxUrl = `module=account&action=tokentx&address=${process.env.ADDRESS}&startblock=${startBlock.block}&endblock=${endBlock.block}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const getOtherTxUrl = `module=account&action=txlist&address=${process.env.ADDRESS}&startblock=${startBlock.block}&endblock=${endBlock.block}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`;

  let [tokenTransactions, otherTransactions] = await Promise.all([
    axios.get(`https://api.etherscan.io/api?${getTokenTxUrl}`),
    axios.get(`https://api.etherscan.io/api?${getOtherTxUrl}`) 
  ]);
  tokenTransactions = tokenTransactions.data.result;
  otherTransactions = otherTransactions.data.result.filter(tx => {
    return tx.from === process.env.ADDRESS || tx.from !== process.env.ADDRESS && tx.isError === '0';
  });
  tokenTransactions = tokenTransactions.map(tx =>({
    ...tx,
    timeStamp: parseInt(tx.timeStamp),
    value: parseInt(tx.value) / 10 ** parseInt(tx.tokenDecimal),
    gasUsed: parseInt(tx.gasUsed),
    gasPrice: parseInt(tx.gasPrice),
    assetName: tx.tokenSymbol,
    assetAddress: tx.contractAddress
  }));
  otherTransactions = otherTransactions.map(tx => ({
    ...tx,
    timeStamp: parseInt(tx.timeStamp),
    value: parseInt(tx.value) / 10 ** 18, 
    gasUsed: parseInt(tx.gasUsed),
    gasPrice: parseInt(tx.gasPrice),
    assetName: tx.value === '0' ? 'N/A' : 'ETH',
    assetAddress: 'N/A'
  }));
  return [...tokenTransactions, ...otherTransactions];
};

module.exports = init;


/**
 * This is an example of what we receive from Etherscan.
    
    Other transactions:

    blockNumber: '12552141',
    timeStamp: '1622598142',
    hash: '0x0c1252e1a45caf7643b590b5f7a3ddaf9aff602e061bfa274fe0d1546367ddd2',
    nonce: '53508',
    blockHash: '0x3f0674806eed97a25a253f8c4923a11a72e3a5f8d3747445c1ca326b7717ef7e',
    transactionIndex: '36',
    from: '0x56eddb7aa87536c09ccc2793473599fd21a8b17f',
    to: '0x7393a26c66e6b82944aad564044dc8ed28f786b0',
    value: '223158500000000000',
    gas: '207128',
    gasPrice: '32000000000',
    isError: '0',
    txreceipt_status: '1',
    input: '0x',
    contractAddress: '',
    cumulativeGasUsed: '1871891',
    gasUsed: '21000',
    confirmations: '364054'

    Token transactions:

    blockNumber: '12581239',
    timeStamp: '1622986335',
    hash: '0xfed160ec658be4c6cc6287de60d5b7bc00f82b63404aeb4ec9bdd8f05c596d63',
    nonce: '130',
    blockHash: '0x7521bafdc4f7986879fe7ada4e2bf8a7cefa44b9538bc73b581b9cae4f71f480',
    from: '0x70292543a3254c74399b3f6d86ac6fec37f4e82a',
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    to: '0x7393a26c66e6b82944aad564044dc8ed28f786b0',
    value: '250000000',
    tokenName: 'Tether USD',
    tokenSymbol: 'USDT',
    tokenDecimal: '6',
    transactionIndex: '39',
    gas: '100000',
    gasPrice: '15000000000',
    gasUsed: '46109',
    cumulativeGasUsed: '1795244',
    input: 'deprecated',
    confirmations: '335007'
 **/

