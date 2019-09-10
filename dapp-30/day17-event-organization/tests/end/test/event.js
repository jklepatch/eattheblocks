const EventContract = artifacts.require('EventContract');
const timeHelper = require('ganache-time-traveler');

const assertError = async (promise, error) => {
  try {
    await promise;
  } catch(e) {
    assert(e.message.includes(error))
    return;
  }
  assert(false);
}

contract('EventContract', (accounts) => {
  let eventContract = null;
  before(async () => {
    eventContract = await EventContract.deployed();
  });

  it('Should NOT create an event if date if before now', async () => {
    const date =  parseInt((new Date()).getTime() / 1000 - 10);
    await assertError(
      eventContract.createEvent('event1', date, 5, 10),
      'can only organize event at a future date'
    );
  });

  it('Should NOT create an event if less than 1 ticket', async () => {
    const date =  parseInt((new Date()).getTime() / 1000 + 100);
    await assertError(
      eventContract.createEvent('event1', date, 5, 0),
      'can only organize event with at least 1 ticket'
    );
  });

  it('Should create an event', async () => {
    const date =  parseInt((new Date()).getTime() / 1000 + 100);
    await eventContract.createEvent('event1', date, 5, 2);
  });

  it('Should NOT buy a ticket if event does not exist', async () => {
    await assertError(
      eventContract.buyTicket(1, 1),
      'this event does not exist'
    );
  });

  it('Should NOT buy a ticket if event is not active', async () => {
    await assertError(
      eventContract.buyTicket(0, 1),
      'event must be active'
    );
  });

  it('Should NOT buy a ticket if wrong amount of ether sent', async () => {
    timeHelper.advanceTime(100);
    await assertError(
      eventContract.buyTicket(0, 1),
      'ether sent must be equal to total ticket cost'
    );
  });

  it('Should NOT buy a ticket if not enough ticket left', async () => {
    await assertError(
      eventContract.buyTicket(0, 3, {value: 15}),
      'not enough ticket left'
    );
  });

  it('Should buy tickets', async () => {
    await eventContract.buyTicket(0, 1, {value: 5, from: accounts[1]});
    await eventContract.buyTicket(0, 1, {value: 5, from: accounts[2]});
    const ticketCount1 = await eventContract.tickets.call(accounts[1], 0);
    const ticketCount2 = await eventContract.tickets.call(accounts[2], 0);
    assert(ticketCount1.toNumber() === 1);
    assert(ticketCount2.toNumber() === 1);
  });

  it('Should NOT transfer ticket it not enough tickets', async () => {
    await assertError(
      eventContract.transferTicket(0, 3, accounts[5]),
      'not enough ticket'
    );
  });

  it('Should transfer ticket', async () => {
    await eventContract.transferTicket(0, 1, accounts[5], {from: accounts[1]});
    const ticketCount1 = await eventContract.tickets.call(accounts[1], 0);
    const ticketCount5 = await eventContract.tickets.call(accounts[5], 0);
    assert(ticketCount1.toNumber() === 0);
    assert(ticketCount5.toNumber() === 1);
  });
});
