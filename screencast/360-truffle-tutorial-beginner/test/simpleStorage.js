const SimpleStorage = artifacts.require('SimpleStorage.sol');

contract('SimpleStorage', () => {
  it('Should update data', async () => {
    const storage = await SimpleStorage.new();
    await storage.updateData(10);
    const data = await storage.readData();
    assert(data.toString() === '10');
  });
});
