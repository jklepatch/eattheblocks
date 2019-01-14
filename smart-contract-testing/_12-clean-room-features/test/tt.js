const MyContract = artifacts.require('./MyContract');

contract('MyContract 1', () => {
  it('should work', async () => {
    const contract = await MyContract.deployed();
    console.log(contract.address);
    console.log('this:');
    await contract.set('this');
    console.log(await contract.data());
    assert(true);
  });
  it('should work', async () => {
    const contract = await MyContract.deployed();
    console.log(contract.address);
    console.log('this');
    console.log(await contract.data());
    assert(true);
  });
});

contract('MyContractt', () => {
  it('should work', async () => {
    const contract = await MyContract.deployed();
    console.log(contract.address);
    console.log('??');
    console.log(await contract.data());
    assert(true);
  });
});
