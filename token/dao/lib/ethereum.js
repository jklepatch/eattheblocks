import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import Token from '../../build-truffle/ETBToken.json';

const networks = {
  '56': 'Binance Smart Chain Mainnet', 
  '97': 'Binance Smart Chain Testnet', 
  '5777': 'Local development blockchain' 
}

const getBlockchain = () =>
  new Promise( async (resolve, reject) => {
    const provider = await detectEthereumProvider();
    if(provider) {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: 'net_version' })
      if(networkId !== process.env.NEXT_PUBLIC_NETWORK_ID) {
        const targetNetwork = networks[process.env.NEXT_PUBLIC_NETWORK_ID];
        reject(`Wrong network, please switch to ${targetNetwork}`);
        return;
      }
      const web3 = new Web3(provider);
      const token = new web3.eth.Contract(
        Token.abi,
        Token.networks[networkId].address,
      );
      resolve({web3, token, address: accounts[0]});
      return;
    }
    reject('Install Metamask');
  });

export default getBlockchain;
