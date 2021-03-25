import { ethers, Contract } from 'ethers';
import SimpleStorage from './contracts/SimpleStorage.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const simpleStorage = new Contract(
          SimpleStorage.networks[window.ethereum.networkVersion].address,
          SimpleStorage.abi,
          signer
        );

        resolve({simpleStorage});
      }
      resolve({simpleStorage: undefined});
    });
  });

export default getBlockchain;
