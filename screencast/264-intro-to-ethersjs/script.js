const { ethers } = require('ethers');
const MyContractArtifact = require('./build/contracts/MyContract.json');
/**
 * for frontend
 * import { ethers } from 'ethers';
 * import MyContractArtifact from './build/contracts/MyContract';
 */

const CONTRACT_ADDRESS = MyContractArtifact.networks['5777'].address;

const provider = new ethers.providers.JsonRpcProvider('http://localhost:9545');
/**
 * for metamask
 * const provider = new ethers.providers.Web3Provider(window.ethereum); 
 *
 * for connection to mainnet
 * const provider = new ethers.providers.getDefaultProvider();
 * with your own API KEYS
 * const provider = new ethers.providers.getDefaultProvider({infura: INFURA_KEY, alchemy: ALCHEMY_KEY, etc...});
 *
 * for connection to a public testnet
 * const provider = new ethers.getDefaultProvider('kovan');
 *
 * With specific API
 * const provider = new ethers.providers.InfuraProvider('kovan', API_KEY);
 * const provider = new ethers.providers.AlchemyProvider('kovan', API_KEY);
 */

/**
 * If you want to add custom accounts
 * const wallet = new ethers.Wallet.fromMnemonic('mnemonic here', provider);
 * const signer = wallet.getSigner();
 */

async function main() {
  const ABI = [
    'function data() view returns(uint)',
    'function setData(uint _data) external'
  ];

  const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider); 
  const value = await readOnlyContract.data();
  console.log(value.toString());

  const signer = provider.getSigner();
  await signer.sendTransaction({
    to: '0x2cfb04529afed0ceeb3e7518130e1843276c829b',
    value: 1000
  });
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  const txResponse = await contract.setData(2);
  const txReceipt = await txResponse.wait();
  console.log(txReceipt);

  console.log(ethers.utils.formatEther(1000));
  console.log(ethers.utils.parseEther('1.2'));
  console.log(ethers.utils.formatUnits('1000', 18));
  console.log(ethers.utils.parseUnits('2.3', 18));
}
main();
