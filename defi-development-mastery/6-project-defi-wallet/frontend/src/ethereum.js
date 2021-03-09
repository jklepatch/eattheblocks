import { ethers, Contract } from 'ethers';
import Wallet from './contracts/Wallet.json';
import addresses from './addresses.js';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const wallet = new Contract(
          Wallet.networks[window.ethereum.networkVersion].address,
          Wallet.abi,
          signer
        );

        const dai = new Contract(
          addresses.dai,
          ['function approve(address spender, uint amount) external'],
          signer
        );

        resolve({signer, wallet, dai});
      }
      resolve({signer: undefined, wallet: undefined, dai: undefined});
    });
  });

export default getBlockchain;
