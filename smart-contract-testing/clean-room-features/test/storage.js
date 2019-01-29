const Storage = artifacts.require('Storage');

contract('my tests', () => {
  //
  it('test description 1', async() => {
    const storage = Storage.deployed();
    await storage.set('hello');
    console.log(await storage.data());
    //define tests
  });

  it('test description 2', () => {
    //define tests
  });
});

contract('my tests', () => {
  //
  it('test description 1', () => {
    //define tests
  });

  it('test description 2', () => {
    //define tests
  });
});
