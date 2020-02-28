const Storage = artifacts.require('Storage');

module.exports = async done => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);

  const storage = await Storage.deployed();
  await storage.set(10);
  const data = await storage.data();
  console.log(data.toString());

  done();
}

