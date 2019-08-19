import AdvancedStorage from '../build/contracts/AdvancedStorage.json';
import Web3 from 'web3';

var web3 = new Web3('http://localhost:9545');
var deploymentKey = Object.keys(AdvancedStorage.networks)[0];
var advancedStorage = new web3.eth.Contract(
  AdvancedStorage.abi, 
  AdvancedStorage.networks[deploymentKey].address
);

document.addEventListener('DOMContentLoaded', () => {
  var $addData = document.getElementById('addData');
  var $data = document.getElementById('data');
  var accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
    return advancedStorage.methods.getAll().call();
  })
  .then(result => {
    $data.innerHTML = result;
  });

  $addData.addEventListener('submit', (e) => {
    e.preventDefault();
    var data = e.target.elements[0].value;
    advancedStorage.methods.add(data).send({from: accounts[0]})
    .then(result => {
      return advancedStorage.methods.getAll().call();
    })
    .then(result => {
      $data.innerHTML = result.join(', ');
    });
  });
});
