var abi = [
  {
      "constant": false,
      "inputs": [
        {
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "publicGet",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
];
var address =  '0x1dFd2b89b5b287151CD619A87a6e7e1fff71006B';

var web3 = new Web3('http://localhost:9545');
var contract = new web3.eth.Contract(abi, address);
// use `contract` to interact with smart contract
