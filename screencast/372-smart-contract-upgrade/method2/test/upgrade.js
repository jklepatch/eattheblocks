const MainContract = artifacts.require('method2/MainContract.sol');
const V1 = artifacts.require('method2/V1.sol');
const V2 = artifacts.require('method2/V2.sol');

contract('Method2', ([admin, _]) => {
  it('should upgrade', async () => {
    let data;
    const mainContract = await MainContract.new();

    //Test V1
    const v1 = await V1.new();
    await mainContract.upgrade(v1.address);
    data = await mainContract.getData();
    assert(data.toNumber() === 10);

    //Test V2
    const v2 = await V2.new();
    await mainContract.upgrade(v2.address);
    data = await mainContract.getData();
    assert(data.toNumber() === 100);
  });
});
