const Storage = artifacts.require('Storage');

contract('storage', function(accounts) {
  it("should assert true", async () => {
    const storage = await Storage.deployed();
    await storage.set("Hello World");
    const result = await storage.get();
    assert(result == "Hello World", 'Should be equal to Hello World');
  });
});
