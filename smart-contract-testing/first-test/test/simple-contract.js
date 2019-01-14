contract('SimpleContract', () => {
  it('should deploy', async() => {
    const contract = await HelloWorld.deployed();
    const actual = await contract.hello();
    assert.equal(actual, 'Hello World');
  });
});
