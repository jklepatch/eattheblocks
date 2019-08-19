import EtherWallet from '../build/contracts/EtherWallet.json';
import Web3 from 'web3';

const web3 = new Web3('http://localhost:9545');
const deploymentKey = Object.keys(EtherWallet.networks)[0];
const etherWallet = new web3.eth.Contract(
  EtherWallet.abi, 
  EtherWallet.networks[deploymentKey].address
);

document.addEventListener('DOMContentLoaded', () => {
  const $deposit = document.getElementById('deposit');
  const $depositResult = document.getElementById('deposit-result');
  const $send = document.getElementById('send');
  const $sendResult = document.getElementById('send-result');
  const $balance = document.getElementById('balance');
  let accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });


  const refreshBalance = () => {
    etherWallet.methods
      .balanceOf()
      .call()
      .then(result => {
        $balance.innerHTML = result;
      });
  };
  refreshBalance();

  $deposit.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = e.target.elements[0].value;
    etherWallet.methods
      .deposit()
      .send({from: accounts[0], value: amount})
      .then(result => {
        $depositResult.innerHTML = `Successful ${amount} wei deposit`;
        refreshBalance();
      })
      .catch(_e => {
        $depositResult.innerHTML = `Ooops... there was an error while trying to make a deposit...`;
      });
  });

  $send.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = e.target.elements[0].value;
    const amount = e.target.elements[1].value;
    etherWallet.methods
      .send(to, amount)
      .send({from: accounts[0]})
      .then(result => {
        $sendResult.innerHTML = `Sent ${amount} wei to ${to}`;
        refreshBalance();
      })
      .catch(_e => {
        $sendResult.innerHTML = `Ooops... there was an error while trying to send ether from the contract...`;
      });
  });

});
