const AdvancedStorage = artifacts.require('AdvancedStorage');

contract('AdvancedStorage', () => {
  let advancedStorage = null;
  before(async () => {
    advancedStorage = await AdvancedStorage.deployed();
  });

  it('Should add an id', async () => {
    await advancedStorage.add(10);
    const id = await advancedStorage.ids(0);
    assert(id.toNumber() === 10);
  });

  it('Should get an id', async () => {
    await advancedStorage.add(20);
    const id = await advancedStorage.get(1);
    assert(id.toNumber() === 20);
  });

  it('Should get all ids', async () => {
    const rawIds = await advancedStorage.getAll();
    const ids = rawIds.map(id => id.toNumber());
    assert.deepEqual(ids, [10, 20]);
  });

  it('Should return the length of ids array', async () => {
    const length = await advancedStorage.length();
    assert(length.toNumber() === 2); 
  });
});
