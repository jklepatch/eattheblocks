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
  const $withdraw = document.getElementById('withdraw');
  const $widthdrawResult = document.getElementById('withdraw-result');
  const $balance = document.getElementById('balance');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  const refreshBalance = () => {
    web3.eth.getBalance(deed.options.address)
    .then(balance => {
      $balance.innerHTML = balance;
    });
  }

  $widthdraw.addEventListener('submit', (e) => {
    e.preventDefault();
    deed.methods
      .withdraw()
      .then(result => {
        $widthdrawResult.innerHTML = `Withdrawal succesful!`;
        refreshBalance();
      })
      .catch(_e => {
        $widthdrawResult.innerHTML = `Ooops... there was an error while trying to widthdraw...`;
      });
  });

  refreshBalance();
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
