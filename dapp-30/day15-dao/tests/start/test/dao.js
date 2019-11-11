const { expectRevert, time } = require('@openzeppelin/test-helpers');
const DAO = artifacts.require('DAO');

contract('DAO', (accounts) => {
  let dao;

  const [investor1, investor2, investor3] = [accounts[1], accounts[2], accounts[3]];
  before(async () => {
    dao = await DAO.new(2, 2, 50);
  });

  it('Should accept contribution', async () => {
  });

  it('Should NOT accept contribution after contributionTime', async () => {
  });

  it('Should create proposal', async () => {
  });

  it('Should NOT create proposal if not from investor', async () => {
  });

  it('Should NOT create proposal if amount too big', async () => {
  });

  it('Should vote', async () => {
  });

  it('Should NOT vote if not investor', async () => {
  });

  it('Should NOT vote if already voted', async () => {
  });

  it('Should NOT vote if after proposal end date', async () => {
  });

  it('Should execute proposal', async () => {
  });

  it('Should NOT execute proposal if not enough votes', async () => {
  });

  it('Should NOT execute proposal twice', async () => {
  });

  it('Should NOT execute proposal before end date', async () => {
  });

  it('Should withdraw ether', async () => {
  });

  it('Should NOT withdraw ether if not admin', async () => {
  });

  it('Should NOT withdraw ether if trying to withdraw too much', async () => {
  });
});
