const StorageFactory = artifacts.require('StorageFactory');
const Storage = artifacts.require('Storage');

module.exports = async function(deployer) {
  const storage = await Storage.deployed();
  await deployer.deploy(StorageFactory, storage.address);
  const storageFactory = await StorageFactory.deployed();
  await storageFactory.createStorage();
  await storageFactory.createStorage();
  await storageFactory.createStorage();

  const storageAddress1 = await storageFactory.getAddress(0);
  const storageAddress2 = await storageFactory.getAddress(1);
  const storageAddress3 = await storageFactory.getAddress(2);
  const storage1 = await Storage.at(storageAddress1);
  const storage2 = await Storage.at(storageAddress2);
  const storage3 = await Storage.at(storageAddress3);

  await storage.setData('storage');
  await storage1.setData('storage 1');
  await storage2.setData('storage 2');
  await storage3.setData('storage 3');

  console.log(await storage.data());
  console.log(await storage1.data());
  console.log(await storage2.data());
  console.log(await storage3.data());


    
};
