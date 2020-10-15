const { time } = require('@openzeppelin/test-helpers');
const FungibleNFT = artifacts.require('FungibleNFT.sol');
const NFT = artifacts.require('NFT.sol');
const Dai = artifacts.require('Dai.sol');

const DAI_AMOUNT = web3.utils.toWei('25000');
const SHARE_AMOUNT = web3.utils.toWei('25000');

contract('FungibleNFT', async addresses => {
  const [admin, buyer1, buyer2, buyer3, buyer4, _] = addresses;

  it('should work', async () => {
    //Deploy dai and nft tokens
    const dai = await Dai.new();
    const nft = await NFT.new('My awesome NFT', 'NFT');
    await nft.mint(admin, 1);
    await Promise.all([
      dai.mint(buyer1, DAI_AMOUNT),
      dai.mint(buyer2, DAI_AMOUNT),
      dai.mint(buyer3, DAI_AMOUNT),
      dai.mint(buyer4, DAI_AMOUNT)
    ]);

    //Deploy fungible NFT & start ICO
    const fungibleNFT = await FungibleNFT.new(
      'My Awesome Fungible NFT',
      'FNFT',
      nft.address,
      1,
      1,
      web3.utils.toWei('100000'),
      dai.address
    );
    await nft.approve(fungibleNFT.address, 1);
    await fungibleNFT.startIco();

    //Invest in ICO
    await dai.approve(fungibleNFT.address, DAI_AMOUNT, {from: buyer1});  
    await fungibleNFT.buyShare(SHARE_AMOUNT, {from: buyer1});
    await dai.approve(fungibleNFT.address, DAI_AMOUNT, {from: buyer2});  
    await fungibleNFT.buyShare(SHARE_AMOUNT, {from: buyer2});
    await dai.approve(fungibleNFT.address, DAI_AMOUNT, {from: buyer3});  
    await fungibleNFT.buyShare(SHARE_AMOUNT, {from: buyer3});
    await dai.approve(fungibleNFT.address, DAI_AMOUNT, {from: buyer4});  
    await fungibleNFT.buyShare(SHARE_AMOUNT, {from: buyer4});

    //End ICO
    await time.increase(7 * 86400 + 1); 
    await fungibleNFT.withdrawIcoProfits();

    //Check balances
    const balanceShareBuyer1 = await fungibleNFT.balanceOf(buyer1);
    const balanceShareBuyer2 = await fungibleNFT.balanceOf(buyer2);
    const balanceShareBuyer3 = await fungibleNFT.balanceOf(buyer3);
    const balanceShareBuyer4 = await fungibleNFT.balanceOf(buyer4);
    assert(balanceShareBuyer1.toString() === SHARE_AMOUNT);
    assert(balanceShareBuyer2.toString() === SHARE_AMOUNT);
    assert(balanceShareBuyer3.toString() === SHARE_AMOUNT);
    assert(balanceShareBuyer4.toString() === SHARE_AMOUNT);
    const balanceAdminDai = await dai.balanceOf(admin);
    assert(balanceAdminDai.toString() === web3.utils.toWei('100000'));
  });
});
