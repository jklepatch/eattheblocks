const Storage = artifacts.require('Storage');

contract('storage 1', function(accounts) {
  it("storage 1", async () => {
    const storage = await Storage.deployed();
    await storage.set("Hello world 1");
    const result = await storage.get();
    console.log("storage 1: " + result);
  });
});

contract('storage 2', function(accounts) {
  it("storage 2", async () => {
    const storage = await Storage.deployed();
    let result = await storage.get();
    console.log("storage 2: " + result);
  });
});
