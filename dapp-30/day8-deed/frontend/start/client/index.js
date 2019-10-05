import Web3 from 'web3';
import Deed from '../build/contracts/Deed.json';

let web3;
let deed;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      window.ethereum.enable()
        .then(() => {
          resolve(
            new Web3(window.ethereum)
          );
        })
        .catch(e => {
          reject(e);
        });
      return;
    }
    if(typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  return new web3.eth.Contract(
    Deed.abi, 
    Deed
      .networks[networkId]
      .address
  );
};

const initApp = () => {
};

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_deed => {
      deed = _deed;
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
