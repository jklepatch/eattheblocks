const MyContract = artifacts.require('MyContract');

contract('MyContract', () => {
  it('should set a specific date', async () => {
    const myContract = await MyContract.deployed();
    //Arrange Act Assert
    const now = Math.floor((new Date()).getTime() / 1000);
    await myContract.setDate(now);
    const result = await myContract.date();
    assert(result.toNumber() === now, 'date should be equal to now');
  });
});
