const SimpleStorage = artifacts.require('SimpleStorage.sol');

contract('Storage', () => {
  describe('SimpleStorage', async () => {
    const storage = await Storage.new();
    await storage.updateData(10);
    const data = await storage.getData();
    assert(data.toString() === '3');
  });
});
