const MyContract = artifacts.require('MyContract');
const chai = require('chai');
const chaiAssert = chai.assert;

contract('MyContract', () => {
  it('should set a specific date', async () => {
    const myContract = await MyContract.deployed();
    //Arrange Act Assert
    const now = Math.floor((new Date()).getTime() / 1000);
    await myContract.setDate(now);
    const result = await myContract.date();
    assert(result.toNumber() === now, 'date should be equal to now');
  });
  it('should set a future date based on a time offset', async () => {
    const myContract = await MyContract.deployed();
    const now = Math.floor((new Date()).getTime() / 1000);
    await new Promise((resolve, reject) => {
      setTimeout(async() => {
        await myContract.setEnd(60);
        const result = await myContract.end();
        chaiAssert.closeTo(result.toNumber(), now + 60, 20);
        resolve(undefined);
      }, 5000);
    });
  });
});
