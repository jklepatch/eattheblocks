import { ethers, Contract } from 'ethers';
import Market from './contracts/Market.json';
import NFT from './contracts/MockNFT.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        const market = new Contract(
          Market.networks[window.ethereum.networkVersion].address,
          Market.abi,
          signer
        );

        const nft = new Contract(
          NFT.networks[window.ethereum.networkVersion].address,
          NFT.abi,
          signer
        );

        resolve({provider, market, nft});
      }
      resolve({provider: undefined, market: undefined, nft: undefined});
    });
  });

export default getBlockchain;
