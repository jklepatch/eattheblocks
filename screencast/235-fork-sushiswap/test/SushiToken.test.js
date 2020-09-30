const { expectRevert } = require('@openzeppelin/test-helpers');
const SushiToken = artifacts.require('SushiToken');

contract('SushiToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.sushi = await SushiToken.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.sushi.name();
        const symbol = await this.sushi.symbol();
        const decimals = await this.sushi.decimals();
        assert.equal(name.valueOf(), 'SushiToken');
        assert.equal(symbol.valueOf(), 'SUSHI');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should only allow owner to mint token', async () => {
        await this.sushi.mint(alice, '100', { from: alice });
        await this.sushi.mint(bob, '1000', { from: alice });
        await expectRevert(
            this.sushi.mint(carol, '1000', { from: bob }),
            'Ownable: caller is not the owner',
        );
        const totalSupply = await this.sushi.totalSupply();
        const aliceBal = await this.sushi.balanceOf(alice);
        const bobBal = await this.sushi.balanceOf(bob);
        const carolBal = await this.sushi.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.sushi.mint(alice, '100', { from: alice });
        await this.sushi.mint(bob, '1000', { from: alice });
        await this.sushi.transfer(carol, '10', { from: alice });
        await this.sushi.transfer(carol, '100', { from: bob });
        const totalSupply = await this.sushi.totalSupply();
        const aliceBal = await this.sushi.balanceOf(alice);
        const bobBal = await this.sushi.balanceOf(bob);
        const carolBal = await this.sushi.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.sushi.mint(alice, '100', { from: alice });
        await expectRevert(
            this.sushi.transfer(carol, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.sushi.transfer(carol, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
