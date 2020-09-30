const { expectRevert, time } = require('@openzeppelin/test-helpers');
const SushiToken = artifacts.require('SushiToken');
const MasterChef = artifacts.require('MasterChef');
const MockERC20 = artifacts.require('MockERC20');

contract('MasterChef', ([alice, bob, carol, dev, minter]) => {
    beforeEach(async () => {
        this.sushi = await SushiToken.new({ from: alice });
    });

    it('should set correct state variables', async () => {
        this.chef = await MasterChef.new(this.sushi.address, dev, '1000', '0', '1000', { from: alice });
        await this.sushi.transferOwnership(this.chef.address, { from: alice });
        const sushi = await this.chef.sushi();
        const devaddr = await this.chef.devaddr();
        const owner = await this.sushi.owner();
        assert.equal(sushi.valueOf(), this.sushi.address);
        assert.equal(devaddr.valueOf(), dev);
        assert.equal(owner.valueOf(), this.chef.address);
    });

    it('should allow dev and only dev to update dev', async () => {
        this.chef = await MasterChef.new(this.sushi.address, dev, '1000', '0', '1000', { from: alice });
        assert.equal((await this.chef.devaddr()).valueOf(), dev);
        await expectRevert(this.chef.dev(bob, { from: bob }), 'dev: wut?');
        await this.chef.dev(bob, { from: dev });
        assert.equal((await this.chef.devaddr()).valueOf(), bob);
        await this.chef.dev(alice, { from: bob });
        assert.equal((await this.chef.devaddr()).valueOf(), alice);
    })

    context('With ERC/LP token added to the field', () => {
        beforeEach(async () => {
            this.lp = await MockERC20.new('LPToken', 'LP', '10000000000', { from: minter });
            await this.lp.transfer(alice, '1000', { from: minter });
            await this.lp.transfer(bob, '1000', { from: minter });
            await this.lp.transfer(carol, '1000', { from: minter });
            this.lp2 = await MockERC20.new('LPToken2', 'LP2', '10000000000', { from: minter });
            await this.lp2.transfer(alice, '1000', { from: minter });
            await this.lp2.transfer(bob, '1000', { from: minter });
            await this.lp2.transfer(carol, '1000', { from: minter });
        });

        it('should allow emergency withdraw', async () => {
            // 100 per block farming rate starting at block 100 with bonus until block 1000
            this.chef = await MasterChef.new(this.sushi.address, dev, '100', '100', '1000', { from: alice });
            await this.chef.add('100', this.lp.address, true);
            await this.lp.approve(this.chef.address, '1000', { from: bob });
            await this.chef.deposit(0, '100', { from: bob });
            assert.equal((await this.lp.balanceOf(bob)).valueOf(), '900');
            await this.chef.emergencyWithdraw(0, { from: bob });
            assert.equal((await this.lp.balanceOf(bob)).valueOf(), '1000');
        });

        it('should give out SUSHIs only after farming time', async () => {
            // 100 per block farming rate starting at block 100 with bonus until block 1000
            this.chef = await MasterChef.new(this.sushi.address, dev, '100', '100', '1000', { from: alice });
            await this.sushi.transferOwnership(this.chef.address, { from: alice });
            await this.chef.add('100', this.lp.address, true);
            await this.lp.approve(this.chef.address, '1000', { from: bob });
            await this.chef.deposit(0, '100', { from: bob });
            await time.advanceBlockTo('89');
            await this.chef.deposit(0, '0', { from: bob }); // block 90
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '0');
            await time.advanceBlockTo('94');
            await this.chef.deposit(0, '0', { from: bob }); // block 95
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '0');
            await time.advanceBlockTo('99');
            await this.chef.deposit(0, '0', { from: bob }); // block 100
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '0');
            await time.advanceBlockTo('100');
            await this.chef.deposit(0, '0', { from: bob }); // block 101
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '1000');
            await time.advanceBlockTo('104');
            await this.chef.deposit(0, '0', { from: bob }); // block 105
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '5000');
            assert.equal((await this.sushi.balanceOf(dev)).valueOf(), '500');
            assert.equal((await this.sushi.totalSupply()).valueOf(), '5500');
        });

        it('should not distribute SUSHIs if no one deposit', async () => {
            // 100 per block farming rate starting at block 200 with bonus until block 1000
            this.chef = await MasterChef.new(this.sushi.address, dev, '100', '200', '1000', { from: alice });
            await this.sushi.transferOwnership(this.chef.address, { from: alice });
            await this.chef.add('100', this.lp.address, true);
            await this.lp.approve(this.chef.address, '1000', { from: bob });
            await time.advanceBlockTo('199');
            assert.equal((await this.sushi.totalSupply()).valueOf(), '0');
            await time.advanceBlockTo('204');
            assert.equal((await this.sushi.totalSupply()).valueOf(), '0');
            await time.advanceBlockTo('209');
            await this.chef.deposit(0, '10', { from: bob }); // block 210
            assert.equal((await this.sushi.totalSupply()).valueOf(), '0');
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '0');
            assert.equal((await this.sushi.balanceOf(dev)).valueOf(), '0');
            assert.equal((await this.lp.balanceOf(bob)).valueOf(), '990');
            await time.advanceBlockTo('219');
            await this.chef.withdraw(0, '10', { from: bob }); // block 220
            assert.equal((await this.sushi.totalSupply()).valueOf(), '11000');
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '10000');
            assert.equal((await this.sushi.balanceOf(dev)).valueOf(), '1000');
            assert.equal((await this.lp.balanceOf(bob)).valueOf(), '1000');
        });

        it('should distribute SUSHIs properly for each staker', async () => {
            // 100 per block farming rate starting at block 300 with bonus until block 1000
            this.chef = await MasterChef.new(this.sushi.address, dev, '100', '300', '1000', { from: alice });
            await this.sushi.transferOwnership(this.chef.address, { from: alice });
            await this.chef.add('100', this.lp.address, true);
            await this.lp.approve(this.chef.address, '1000', { from: alice });
            await this.lp.approve(this.chef.address, '1000', { from: bob });
            await this.lp.approve(this.chef.address, '1000', { from: carol });
            // Alice deposits 10 LPs at block 310
            await time.advanceBlockTo('309');
            await this.chef.deposit(0, '10', { from: alice });
            // Bob deposits 20 LPs at block 314
            await time.advanceBlockTo('313');
            await this.chef.deposit(0, '20', { from: bob });
            // Carol deposits 30 LPs at block 318
            await time.advanceBlockTo('317');
            await this.chef.deposit(0, '30', { from: carol });
            // Alice deposits 10 more LPs at block 320. At this point:
            //   Alice should have: 4*1000 + 4*1/3*1000 + 2*1/6*1000 = 5666
            //   MasterChef should have the remaining: 10000 - 5666 = 4334
            await time.advanceBlockTo('319')
            await this.chef.deposit(0, '10', { from: alice });
            assert.equal((await this.sushi.totalSupply()).valueOf(), '11000');
            assert.equal((await this.sushi.balanceOf(alice)).valueOf(), '5666');
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '0');
            assert.equal((await this.sushi.balanceOf(carol)).valueOf(), '0');
            assert.equal((await this.sushi.balanceOf(this.chef.address)).valueOf(), '4334');
            assert.equal((await this.sushi.balanceOf(dev)).valueOf(), '1000');
            // Bob withdraws 5 LPs at block 330. At this point:
            //   Bob should have: 4*2/3*1000 + 2*2/6*1000 + 10*2/7*1000 = 6190
            await time.advanceBlockTo('329')
            await this.chef.withdraw(0, '5', { from: bob });
            assert.equal((await this.sushi.totalSupply()).valueOf(), '22000');
            assert.equal((await this.sushi.balanceOf(alice)).valueOf(), '5666');
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '6190');
            assert.equal((await this.sushi.balanceOf(carol)).valueOf(), '0');
            assert.equal((await this.sushi.balanceOf(this.chef.address)).valueOf(), '8144');
            assert.equal((await this.sushi.balanceOf(dev)).valueOf(), '2000');
            // Alice withdraws 20 LPs at block 340.
            // Bob withdraws 15 LPs at block 350.
            // Carol withdraws 30 LPs at block 360.
            await time.advanceBlockTo('339')
            await this.chef.withdraw(0, '20', { from: alice });
            await time.advanceBlockTo('349')
            await this.chef.withdraw(0, '15', { from: bob });
            await time.advanceBlockTo('359')
            await this.chef.withdraw(0, '30', { from: carol });
            assert.equal((await this.sushi.totalSupply()).valueOf(), '55000');
            assert.equal((await this.sushi.balanceOf(dev)).valueOf(), '5000');
            // Alice should have: 5666 + 10*2/7*1000 + 10*2/6.5*1000 = 11600
            assert.equal((await this.sushi.balanceOf(alice)).valueOf(), '11600');
            // Bob should have: 6190 + 10*1.5/6.5 * 1000 + 10*1.5/4.5*1000 = 11831
            assert.equal((await this.sushi.balanceOf(bob)).valueOf(), '11831');
            // Carol should have: 2*3/6*1000 + 10*3/7*1000 + 10*3/6.5*1000 + 10*3/4.5*1000 + 10*1000 = 26568
            assert.equal((await this.sushi.balanceOf(carol)).valueOf(), '26568');
            // All of them should have 1000 LPs back.
            assert.equal((await this.lp.balanceOf(alice)).valueOf(), '1000');
            assert.equal((await this.lp.balanceOf(bob)).valueOf(), '1000');
            assert.equal((await this.lp.balanceOf(carol)).valueOf(), '1000');
        });

        it('should give proper SUSHIs allocation to each pool', async () => {
            // 100 per block farming rate starting at block 400 with bonus until block 1000
            this.chef = await MasterChef.new(this.sushi.address, dev, '100', '400', '1000', { from: alice });
            await this.sushi.transferOwnership(this.chef.address, { from: alice });
            await this.lp.approve(this.chef.address, '1000', { from: alice });
            await this.lp2.approve(this.chef.address, '1000', { from: bob });
            // Add first LP to the pool with allocation 1
            await this.chef.add('10', this.lp.address, true);
            // Alice deposits 10 LPs at block 410
            await time.advanceBlockTo('409');
            await this.chef.deposit(0, '10', { from: alice });
            // Add LP2 to the pool with allocation 2 at block 420
            await time.advanceBlockTo('419');
            await this.chef.add('20', this.lp2.address, true);
            // Alice should have 10*1000 pending reward
            assert.equal((await this.chef.pendingSushi(0, alice)).valueOf(), '10000');
            // Bob deposits 10 LP2s at block 425
            await time.advanceBlockTo('424');
            await this.chef.deposit(1, '5', { from: bob });
            // Alice should have 10000 + 5*1/3*1000 = 11666 pending reward
            assert.equal((await this.chef.pendingSushi(0, alice)).valueOf(), '11666');
            await time.advanceBlockTo('430');
            // At block 430. Bob should get 5*2/3*1000 = 3333. Alice should get ~1666 more.
            assert.equal((await this.chef.pendingSushi(0, alice)).valueOf(), '13333');
            assert.equal((await this.chef.pendingSushi(1, bob)).valueOf(), '3333');
        });

        it('should stop giving bonus SUSHIs after the bonus period ends', async () => {
            // 100 per block farming rate starting at block 500 with bonus until block 600
            this.chef = await MasterChef.new(this.sushi.address, dev, '100', '500', '600', { from: alice });
            await this.sushi.transferOwnership(this.chef.address, { from: alice });
            await this.lp.approve(this.chef.address, '1000', { from: alice });
            await this.chef.add('1', this.lp.address, true);
            // Alice deposits 10 LPs at block 590
            await time.advanceBlockTo('589');
            await this.chef.deposit(0, '10', { from: alice });
            // At block 605, she should have 1000*10 + 100*5 = 10500 pending.
            await time.advanceBlockTo('605');
            assert.equal((await this.chef.pendingSushi(0, alice)).valueOf(), '10500');
            // At block 606, Alice withdraws all pending rewards and should get 10600.
            await this.chef.deposit(0, '0', { from: alice });
            assert.equal((await this.chef.pendingSushi(0, alice)).valueOf(), '0');
            assert.equal((await this.sushi.balanceOf(alice)).valueOf(), '10600');
        });
    });
});
