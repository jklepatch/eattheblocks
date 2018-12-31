pragma solidity ^0.4.7;

contract MerkleProof {
  bytes32[] roots;

  function addRoot(bytes32 root) public {
    roots.push(root);
  }

  //Not sure this is necessary to have this
  function checkProof(bytes proof, bytes32 rootId, bytes32 hash) 
    view 
    returns (bool) {
    bytes32 el;
    bytes32 h = hash;

    for (uint256 i = 32; i <= proof.length; i += 32) {
        assembly {
            el := mload(add(proof, i))
        }

        if (h < el) {
            h = sha3(h, el);
        } else {
            h = sha3(el, h);
        }
    }

    return h == roots[rootId];
  }
