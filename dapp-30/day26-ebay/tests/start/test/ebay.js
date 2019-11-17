const { expectRevert, expectEvent, time } = require('@openzeppelin/test-helpers');
const Ebay = artifacts.require('Ebay');

contract('Ebay', (accounts) => {
  let ebay;
  const auction = {
    name: 'auction1',
    description: 'Selling item1',
    min: 10,
    duration: 86400 + 1
  };
  const [seller, buyer1, buyer2] = [accounts[0], accounts[1], accounts[2]];
  beforeEach(async () => {
    ebay = await Ebay.new();
  });

  it(
    'should NOT create a new auction if duration is not between 1-10 days', 
    async () => {
  })

  it('should create an auction', async() => {
  });

  it('should NOT create offer if auction does not exist', async () => {
  });

  it('should NOT create offer if auction has expired', async () => {
  });

  it('should NOT create offer if price too low', async () => {
  });

  it('should create offer', async () => {
  });

  it('should NOT trade if auction does not exist', async () => {
  });

  it('should trade', async () => {
  });
});
