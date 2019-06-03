var simpleStorageABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x60fe47b1"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x6d4ce63c"
  }
];
var simpleStorageAddress = '0x63569cbe2609D35f8822B6217737922537785C5d';
var web3 = new Web3('http://localhost:9545');
var simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress);

document.addEventListener('DOMContentLoaded', () => {
  var $setData = document.getElementById('setData');
  var $data = document.getElementById('data');
  var accounts = [];

  web3.eth.getAccounts()
  .then(_accounts => {
    accounts = _accounts;
    return simpleStorage.methods.get().call();
  })
  .then(result => {
    $data.innerHTML = result;
  });

  $setData.addEventListener('submit', (e) => {
    e.preventDefault();
    var data = e.target.elements[0].value;
    simpleStorage.methods.set(data).send({from: accounts[0]})
    .then(result => {
      return simpleStorage.methods.get().call();
    })
    .then(result => {
      $data.innerHTML = result;
    });
  });
});
