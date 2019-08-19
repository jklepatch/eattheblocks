import SplitPayment from '../build/contracts/SplitPayment.json';
import Web3 from 'web3';

const web3 = new Web3('http://localhost:9545');
const deploymentKey = Object.keys(SplitPayment.networks)[0];
const splitPayment = new web3.eth.Contract(
  SplitPayment.abi, 
  SplitPayment.networks[deploymentKey].address
);

document.addEventListener('DOMContentLoaded', () => {
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

});
