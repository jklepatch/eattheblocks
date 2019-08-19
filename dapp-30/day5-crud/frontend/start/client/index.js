import Crud from '../build/contracts/Crud.json';
import Web3 from 'web3';

var web3 = new Web3('http://localhost:9545');
var deploymentKey = Object.keys(Crud.networks)[0];
var crud = new web3.eth.Contract(
  Crud.abi, 
  Crud.networks[deploymentKey].address
);

document.addEventListener('DOMContentLoaded', () => {
  var $create = document.getElementById('create');
  var $createResult = document.getElementById('create-result');
  var $read = document.getElementById('read');
  var $readResultId = document.getElementById('read-result-id');
  var $readResultName = document.getElementById('read-result-name');
  var $edit = document.getElementById('edit');
  var $editResult = document.getElementById('edit-result');
  var $delete = document.getElementById('delete');
  var $deleteResult = document.getElementById('delete-result');
  var accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
  });

  $create.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $read.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $edit.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $delete.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});
