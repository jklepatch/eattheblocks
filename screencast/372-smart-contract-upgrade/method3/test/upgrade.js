const Migrator = artifacts.require('method2/Migrator.sol');
const V1 = artifacts.require('method2/V1.sol');
const V2 = artifacts.require('method2/V2.sol');

contract('Method3', ([admin, recipient1, recipient2, _]) => {
  it('should upgrade', async () => {
    const v1 = await V1.new();
    await v1.transfer(recipient1, 100000);
    await v1.transfer(recipient2, 100000);

    const v2 = await V2.new();
    const migrator = await Migrator.new(v1.address, v2.address);
    await v2.transfer(migrator.address, 1000000); 
    await migrator.migrate(); //from: admin, that's the default address
    await migrator.migrate({from: recipient1});
    await migrator.migrate({from: recipient2});

    const balanceAdmin = await v2.balanceOf(admin);
    const balanceRecipient1 = await v2.balanceOf(recipient1);
    const balanceRecipient2 = await v2.balanceOf(recipient2);
    assert(balanceAdmin.toNumber() === 800000);
    assert(balanceRecipient1.toNumber() === 100000);
    assert(balanceRecipient2.toNumber() === 100000);
  });
});
