
const getQuotes = async () => {
  //TODO: instantiate kyber (web3) and uniswap (uniswap SDK)
  const quotes = await Promise.all(
    kyber.methods.getExpectedRate(),
    kyber.methods.getExpectedRate(),
    kyber.methods.getExpectedRate(),
    uniswapDaiPair.getOutputAmount(),
    uniswapDaiPair.getOutputAmount(),
    uniswapDaiPair.getOutputAmount(),
  );
  //Have to check what kyber and uniswap return. For uniswap will have to divide output amount by input amount
  return {
    kyber: rates.slice(0, 3), 
    uniswap: rates.slice(3, 3) 
  }
};

//async function broadcastTx(from, to, txData, value, gasLimit) {
//  let txCount = await web3.eth.getTransactionCount(USER_ADDRESS);
//  //Method 1: Use a constant
//  let gasPrice = new BN(5).mul(new BN(10).pow(new BN(9))); //5 Gwei
//  //Method 2: Use web3 gasPrice
//  //let gasPrice = await web3.eth.gasPrice;
//  //Method 3: Use KNP Proxy maxGasPrice
//  //let gasPrice = await KYBER_NETWORK_PROXY_CONTRACT.maxGasPrice().call();
//
//  let maxGasPrice = await KYBER_NETWORK_PROXY_CONTRACT.methods
//    .maxGasPrice()
//    .call();
//  //If gasPrice exceeds maxGasPrice, set it to max.
//  if (gasPrice >= maxGasPrice) gasPrice = maxGasPrice;
//
//  let rawTx = {
//    from: from,
//    to: to,
//    data: txData,
//    value: web3.utils.toHex(value),
//    gasLimit: web3.utils.toHex(gasLimit),
//    gasPrice: web3.utils.toHex(gasPrice),
//    nonce: txCount
//  };
//
//  let tx = new Tx(rawTx, { chain: NETWORK, hardfork: 'petersburg' });;
//
//  tx.sign(PRIVATE_KEY);
//  const serializedTx = tx.serialize();
//  txReceipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
//  .catch(error => console.log(error));
//
//  // Log the tx receipt
//  console.log(txReceipt);
//  return;
//}

export default {
  getQuotes
};
