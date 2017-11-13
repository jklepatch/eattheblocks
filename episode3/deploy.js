/**
 * To be used in a node session, by copy pasting each line
 * This is not meant to be run as a deploy script (i.e dont do `node deploy.js`)
 */

//Instantiate web3 and make sure we can see our accounts;
var Web3 = require('web3'); //need web3 1.0
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.net.isListening().then(console.log); //Check that we are connected;
var accounts; // show all our available accounts
web3.eth.getAccounts().then((acc) => {accounts = acc; console.log(acc)});

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
deployContractTx.send({from: accounts[0], gas: 1000000}).then(console.log);

//How to estimate gas, if previous operation fail due to lack of gas.
web3.eth.estimateGas(deployContractTx).then(console.log);
//Alternative way:
deployContractTx.estimateGas().then(console.log);