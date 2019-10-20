const { expectRevert } = require('@openzeppelin/test-helpers');
const Voting = artifacts.require('Voting');

contract('Voting', (accounts) => {
  let voting = null;
  before(async () => {
    voting = await Voting.deployed();
  });

});
