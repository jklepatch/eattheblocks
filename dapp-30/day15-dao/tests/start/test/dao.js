const { expectRevert, time } = require('@openzeppelin/test-helpers');
const DAO = artifacts.require('DAO');

contract('DAO', (accounts) => {
  let dao = null;
  const investor1 = accounts[1];
  const investor2 = accounts[2];
  const investor3 = accounts[3];
  before(async () => {
    dao = await DAO.deployed();
  });
});
