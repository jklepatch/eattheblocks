const ProxyContract = artifacts.require('method1/Proxy.sol');
const V1 = artifacts.require('method1/V1.sol');
const V2 = artifacts.require('method1/V2.sol');

contract('Method1', ([admin, _]) => {
  it('should upgrade', async () => {
    let data, gas, gasPrice, txData, var1, var2, implementationVal, adminVal;
    const proxy = await ProxyContract.new();
    const v1 = await V1.new();
    const v1Web3 = new web3.eth.Contract(
      V1.abi,
      v1.address
    );
    const v2 = await V2.new();
    const v2Web3 = new web3.eth.Contract(
      V2.abi,
      v2.address
    );

    //Test Implementation1
    await proxy.upgrade(v1.address);
    tx = v1Web3.methods.updateVar1(10);
    data = tx.encodeABI();
    gas = await tx.estimateGas({from: admin});
    gasPrice = await web3.eth.getGasPrice();
    txData = {
      from: admin,
      to: proxy.address,
      data, 
      gas: gas + 50000,
      gasPrice
    };
    await web3.eth.sendTransaction(txData);
    tx = v1Web3.methods.var1();
    data = tx.encodeABI();
    txData = {
      from: admin,
      to: proxy.address,
      data: data, 
    };
    var1 = await web3.eth.call(txData);
    assert(web3.utils.hexToNumber(var1) === 10);
    implementationVal = await proxy.implementation();
    assert(implementationVal === v1.address);
    adminVal = await proxy.admin();
    assert(adminVal === admin); 

    //Test Implementation2
    await proxy.upgrade(v2.address);
    tx = v2Web3.methods.updateVar2(100);
    data = tx.encodeABI();
    gas = await tx.estimateGas({from: admin});
    gasPrice = await web3.eth.getGasPrice();
    txData = {
      from: admin,
      to: proxy.address,
      data, 
      gas: gas + 50000,
      gasPrice
    };
    await web3.eth.sendTransaction(txData);
    tx = v2Web3.methods.var1();
    data = tx.encodeABI();
    txData = {
      from: admin,
      to: proxy.address,
      data: data, 
    };
    var1 = await web3.eth.call(txData);
    tx = v2Web3.methods.var2();
    data = tx.encodeABI();
    txData = {
      from: admin,
      to: proxy.address,
      data: data, 
    };
    var2 = await web3.eth.call(txData);
    assert(web3.utils.hexToNumber(var1) === 10);
    assert(web3.utils.hexToNumber(var2) === 100);
    implementationVal = await proxy.implementation();
    assert(implementationVal === v2.address);
    adminVal = await proxy.admin();
    assert(adminVal === admin); 
  });
});
