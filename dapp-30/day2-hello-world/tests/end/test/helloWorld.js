const HelloWorld = artifacts.require('HelloWorld');

contract('HelloWorld', () => {
  it('should return Hello World', async () => {
    const helloWorld = await HelloWorld.deployed();
    const result = await helloWorld.hello();
    assert(result === 'Hello World');
  });
});
