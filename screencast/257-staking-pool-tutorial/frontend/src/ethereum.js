import { ethers, Contract } from 'ethers';
import StakingPool from './contracts/StakingPool.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        const stakingPool = new Contract(
          StakingPool.networks[window.ethereum.networkVersion].address,
          StakingPool.abi,
          signer
        );

        resolve({signerAddress, stakingPool});
      }
      resolve({signerAddress: undefined, stakingPool: undefined});
    });
  });

export default getBlockchain;
