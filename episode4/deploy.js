/**
 * To be used in a node session, by copy pasting each line
 * This is not meant to be run as a deploy script (i.e dont do `node deploy.js`)
 */

//Instantiate web3 and make sure we can see our accounts;
var Web3 = require('web3'); //need web3 1.0
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var accounts;
web3.eth.getAccounts().then((acc) => accounts = acc);

//Compile contracts with solc, the solidity compiler
var solc = require('solc');
var contractSrc = fs.readFileSync('./HelloWorld.sol').toString();
var contractCom = solc.compile(contractSrc);

//Create contract object
var abi = JSON.parse(contractCom.contracts[':HelloWorld'].interface);
var HelloWorld = new web3.eth.Contract(abi);

//Build transaction object;
var bytecode = contractCom.contracts[':HelloWorld'].bytecode;
var argHex = web3.utils.asciiToHex("hey"); //Needed because our contract constructor needs a bytes32 type
var deployContractTx = HelloWorld.deploy({data: bytecode, arguments: [argHex]});

//Deploy to the network
var contractInstance;
deployContractTx.send({from: accounts[0], gas: 1000000}).then((instance) => contractInstance = instance);

//Call a method
contractInstance.methods.getMessage().call().then((result) => console.log(web3.utils.hexToAscii(result)));
