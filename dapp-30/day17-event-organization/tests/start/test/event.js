const { expectRevert, time } = require('@openzeppelin/test-helpers');
const EventContract = artifacts.require('EventContract.sol');

contract('EventContract', (accounts) => {
  let eventContract = null;
  before(async () => {
    eventContract = await EventContract.deployed();
  });

  it('Should NOT create an event if date if before now', async () => {
  });

  it('Should NOT create an event if less than 1 ticket', async () => {
  });

  it('Should create an event', async () => {
  });

  it('Should NOT buy a ticket if event does not exist', async () => {
  });

  it('Should NOT buy a ticket if event is not active', async () => {
  });

  it('Should NOT buy a ticket if wrong amount of ether sent', async () => {
  });

  it('Should NOT buy a ticket if not enough ticket left', async () => {
  });

  it('Should buy tickets', async () => {
  });

  it('Should NOT transfer ticket it not enough tickets', async () => {
  });

  it('Should transfer ticket', async () => {
  });
});
