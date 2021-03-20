import { ethers, Contract } from 'ethers';
import NFT from './contracts/NFT.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const nft = new Contract(
          NFT.networks[window.ethereum.networkVersion].address,
          NFT.abi,
          signer
        );

        resolve({nft});
      }
      resolve({nft: undefined});
    });
  });

export default getBlockchain;
