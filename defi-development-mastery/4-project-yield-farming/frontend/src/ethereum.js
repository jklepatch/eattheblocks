import { ethers, Contract } from 'ethers';
import YieldFarmer from './contracts/YieldFarmer.json';

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

        resolve({signerAddress, yieldFarmer});
      }
      resolve({signerAddress: undefined, yieldFarmer: undefined});
    });
  });

export default getBlockchain;
