import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import SimpleStorage from './contracts/SimpleStorage.json';

const getBlockchain = () =>
  new Promise( async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if(provider) {
      await provider.request({ method: 'eth_requestAccounts' });
      const networkId = await provider.request({ method: 'net_version' })
      provider = new ethers.providers.Web3Provider(provider);
      const signer = provider.getSigner();
      const simpleStorage = new Contract(
        SimpleStorage.networks[networkId].address,
        SimpleStorage.abi,
        signer
      );
      resolve({simpleStorage});
      return;
    }
    reject('Install Metamask');
  });

export default getBlockchain;
