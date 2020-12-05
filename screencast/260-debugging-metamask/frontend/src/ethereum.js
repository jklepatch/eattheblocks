import { ethers, Contract } from 'ethers';
import MyContract from './contracts/MyContract.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const myContract = new Contract(
          //MyContract.networks[window.ethereum.networkVersion].address,
          MyContract.networks['5777'].address,
          MyContract.abi,
          signer
        );

        resolve({myContract});
      }
      resolve({myContract: undefined});
    });
  });

export default getBlockchain;
