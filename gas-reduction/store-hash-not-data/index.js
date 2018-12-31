const MerkleTree = require('merkle-tree-solidity').default;
const sha3 = require('ethereumjs-util').sha256;

console.log(MerkleTree);

// create merkle tree
// expects unique 32 byte buffers as inputs (no hex strings)
// if using web3.sha3, convert first -> Buffer(web3.sha3('a'), 'hex')
const elements = ['lorem ipsum ...', 'lorem ...', 'lorem ip...']
  .map(e => sha3(e));
const merkleTree = new MerkleTree(elements);

console.log(merkleTree);
