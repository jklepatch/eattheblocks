import Web3 from 'web3';
import DexArtifact from '../build/contracts/Dex.json';
import WETHArtifact from '../build/contracts/WETH.json';
import EOSArtifact from '../build/contracts/EOS.json';
import OMGArtifact from '../build/contracts/OMG.json';

//Configure web3 to work with Ethereum blockchain
const web3 = new Web3('http://localhost:9545');

//Configure web3 to work with our smart contract
const getContract = (artifact) => {
  const networks = Object.keys(artifact.networks);
  const network = networks[networks.length - 1];
  const { address } = artifact.networks[network];
  return new web3.eth.Contract(artifact.abi, address);
}

const contracts = {
  dex: getContract(DexArtifact),
  WETH: getContract(WETHArtifact),
  EOS: getContract(EOSArtifact),
  OMG: getContract(OMGArtifact)
}

export { web3, contracts };
