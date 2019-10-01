import Web3 from 'web3';
import SplitPayment from '../build/contracts/SplitPayment.json';

let web3;
let splitPayment;

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
    SplitPayment.abi, 
    SplitPayment
      .networks[networkId]
      .address
  );
};

const initApp = () => {
  const $send = document.getElementById('send');
  const $sendResult = document.getElementById('send-result');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  $send.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = e.target.elements[0].value.split(',');
    const amount = e.target.elements[1].value
      .split(',')
      .map(val => parseInt(val));
    const total = amount.reduce((sum, val) => sum += val);
    splitPayment.methods
      .send(to, amount)
      .send({from: accounts[0], value: total})
      .then(result => {
        $sendResult.innerHTML = `Transfer sent!`;
      })
      .catch(_e => {
        $sendResult.innerHTML = `Ooops... there was an error while trying to send a split payment...`;
      });
  });
};


document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_splitPayment => {
      splitPayment = _splitPayment;
      initApp(); 
    })
    .catch(e => console.log(e.message));
});
