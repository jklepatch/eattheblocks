const artifactToWeb3 = async (artifact, web3) => {
  return new web3.eth.Contract(
    artifact.abi,
    (await artifact.deployed()).address
  );
}

module.exports = {
  artifactToWeb3
};
