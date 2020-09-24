import { ethers, Contract } from 'ethers';
import PaymentProcessor from './contracts/PaymentProcessor.json';
import Dai from './contracts/Dai.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        const paymentProcessor = new Contract(
          PaymentProcessor.networks[window.ethereum.networkVersion].address,
          PaymentProcessor.abi,
          signer
        );

        const dai = new Contract(
          Dai.networks[window.ethereum.networkVersion].address, //for mainnet and public testnet replace by address of already deployed dai token
          Dai.abi,
          signer
        );

        resolve({provider, paymentProcessor, dai});
      }
      resolve({provider: undefined, paymentProcessor: undefined, dai: undefined});
    });
  });

export default getBlockchain;


