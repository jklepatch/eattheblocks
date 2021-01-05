const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', () => {
  it('should set the value of data variable in smart contract', async () => {
    const simpleStorage = await SimpleStorage.deployed();
    await simpleStorage.set('this');
    const result = await simpleStorage.get();
    assert(result, 'this');
  });
});
