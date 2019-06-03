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
    var name = e.target.elements[0].value;
    crud.methods.create(name).send({from: accounts[0]})
    .then(result => {
      $readResultId.innerHTML = `New user ${name} successfully created`;
    })
    .catch(_e => {
      $readResultId.innerHTML = `Ooops... there was an error while trying to create a new user...`;
    });
  });

  $read.addEventListener('submit', (e) => {
    e.preventDefault();
    var id = e.target.elements[0].value;
    crud.methods.read(id).call()
    .then(result => {
      $readResultId.innerHTML = `Id: ${result[0]}`;
      $readResultName.innerHTML = `Name: ${result[1]}`;
    })
    .catch(_e => {
      $readResultId.innerHTML = `Ooops... there was an error while trying to read user ${id}`;
    });
  });

  $edit.addEventListener('submit', (e) => {
    e.preventDefault();
    var id = e.target.elements[0].value;
    var name = e.target.elements[1].value;
    crud.methods.update(id, name).send({from: accounts[0]})
    .then(result => {
      $editResult.innerHTML = `Changed name of user ${id} to ${name}`;
    })
    .catch(_e => {
      $editResult.innerHTML = `Ooops... there was an error while trying to update name of user ${id} to ${name}`;
    });
  });

  $delete.addEventListener('submit', (e) => {
    e.preventDefault();
    var id = e.target.elements[0].value;
    crud.methods.destroy(id).send({from: accounts[0]})
    .then(result => {
      $deleteResult.innerHTML = `Deleted user ${id}`;
    })
    .catch(_e => {
      $deleteResult.innerHTML = `Ooops... there was an error while trying to delete iser ${id}`;
    });
  });
});
