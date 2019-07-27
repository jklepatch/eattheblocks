const MyContract = artifacts.require('MyContract');

contract('MyContract', () => {
  it('should add properly 2 numbers', async () => {
    const myContract = await MyContract.deployed();
    const result = await myContract.add(1, 2);
    assert(result, 'should equal 3');
  });
});
