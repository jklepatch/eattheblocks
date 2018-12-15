const SplitPayment = artifacts.require('SplitPayment');
const BN = web3.utils.BN;

contract('SplitPayment', (accounts) => {
  it('should split payment correctly', async () => {
    const contract = await SplitPayment.deployed();
    const tos = [accounts[1], accounts[2]];
    const amounts = [100, 200];
    await contract
      .send(tos, amounts, {from: accounts[0], value: 300});
    const balances = await Promise.all(tos.map((to) => web3.eth.getBalance(to)));
    const expected = amounts.map((amount) =>  {
      const initial = web3.utils.toWei(new BN(100), 'ether')
      return initial.add(new BN(amount)).toString();
    });
    balances.forEach((balance, i) => {
      assert(balance === expected[i]);
    });
  });
});
