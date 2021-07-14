const { expectRevert, constants, time } = require('@openzeppelin/test-helpers');
const Payment = artifacts.require('Payment.sol');
const Token = artifacts.require('MockToken.sol');

const THIRTY_DAYS = time.duration.days(30); 
const SIXTY_DAYS = time.duration.days(60); 

contract('Payment', addresses => {
  const [admin, merchant, subscriber, _] = addresses;
  let payment, token;

  beforeEach(async () => {
    payment = await Payment.new();
    token = await Token.new(); 
    await token.transfer(subscriber, 1000);
    await token.approve(payment.address, 1000, {from: subscriber});
  });

  it('should create a plan', async () => {
    await payment.createPlan(token.address, 100, THIRTY_DAYS, {from: merchant});
    const plan1 = await payment.plans(0);
    assert(plan1.token === token.address);
    assert(plan1.amount.toString() === '100'); 
    assert(plan1.frequency.toString() === THIRTY_DAYS.toString()); 

    await payment.createPlan(token.address, 200, SIXTY_DAYS, {from: merchant});
    const plan2 = await payment.plans(1);
    assert(plan2.token === token.address);
    assert(plan2.amount.toString() === '200'); 
    assert(plan2.frequency.toString() === SIXTY_DAYS.toString()); 
  });

  it('should NOT create a plan', async () => {
    await expectRevert(
      payment.createPlan(constants.ZERO_ADDRESS, 100, THIRTY_DAYS, {from: merchant}),
      'address cannot be null address'
    );
    await expectRevert(
      payment.createPlan(token.address, 0, THIRTY_DAYS, {from: merchant}),
      'amount needs to be > 0'
    );
    await expectRevert(
      payment.createPlan(token.address, 100, 0, {from: merchant}),
      'frequency needs to be > 0'
    );
  });

  it('should create a subscription', async () => {
    await payment.createPlan(token.address, 100, THIRTY_DAYS, {from: merchant});
    await payment.subscribe(0, {from: subscriber});
    const block = await web3.eth.getBlock('latest')
    const subscription = await payment.subscriptions(subscriber, 0);
    assert(subscription.subscriber === subscriber);
    assert(subscription.start.toString() === block.timestamp.toString());
    assert(subscription.nextPayment.toString() === (block.timestamp + 86400 * 30).toString());
  });
  
  it('should NOT create a subscription', async () => {
    await expectRevert(
      payment.subscribe(0, {from: subscriber}),
      'this plan does not exist'
    );
  });

  it('should subscribe and pay', async () => {
    let balanceMerchant, balanceSubscriber;
    await payment.createPlan(token.address, 100, THIRTY_DAYS, {from: merchant});

    await payment.subscribe(0, {from: subscriber});
    balanceMerchant = await token.balanceOf(merchant); 
    balanceSubscriber = await token.balanceOf(subscriber); 
    assert(balanceMerchant.toString() === '100');
    assert(balanceSubscriber.toString() === '900');

    await time.increase(THIRTY_DAYS + 1);
    await payment.pay(subscriber, 0);
    balanceMerchant = await token.balanceOf(merchant); 
    balanceSubscriber = await token.balanceOf(subscriber); 
    assert(balanceMerchant.toString() === '200');
    assert(balanceSubscriber.toString() === '800');

    await time.increase(THIRTY_DAYS + 1);
    await payment.pay(subscriber, 0);
    balanceMerchant = await token.balanceOf(merchant); 
    balanceSubscriber = await token.balanceOf(subscriber); 
    assert(balanceMerchant.toString() === '300');
    assert(balanceSubscriber.toString() === '700');
  });

  it('should subscribe and NOT pay', async () => {
    let balanceMerchant, balanceSubscriber;
    await payment.createPlan(token.address, 100, THIRTY_DAYS, {from: merchant});

    await payment.subscribe(0, {from: subscriber});
    await time.increase(THIRTY_DAYS - 1);
    await expectRevert(
      payment.pay(subscriber, 0),
      'not due yet'
    );
  });

  it('should cancel subscription', async () => {
    await payment.createPlan(token.address, 100, THIRTY_DAYS, {from: merchant});
    await payment.subscribe(0, {from: subscriber});
    await payment.cancel(0, {from: subscriber});
    const subscription = await payment.subscriptions(subscriber, 0);
    assert(subscription.subscriber === constants.ZERO_ADDRESS);
  });

  it('should NOT cancel subscription', async () => {
    await expectRevert(
      payment.cancel(0, {from: subscriber}),
      'this subscription does not exist'
    );
  });
});
