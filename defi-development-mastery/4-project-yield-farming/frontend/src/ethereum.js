import { ethers, Contract } from 'ethers';
import YieldFarmer from './contracts/YieldFarmer.json';
import addresses from './addresses.js';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        const yieldFarmer = new Contract(
          YieldFarmer.networks[window.ethereum.networkVersion].address,
          YieldFarmer.abi,
          signer
        );

        const dai = new Contract(
          addresses.dai,
          ['function approve(address spender, uint amount) external'],
          signer
        );

        resolve({signerAddress, yieldFarmer, dai});
      }
      resolve({signerAddress: undefined, yieldFarmer: undefined});
    });
  });

export default getBlockchain;
