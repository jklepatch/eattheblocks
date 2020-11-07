const Market = artifacts.require("Market.sol");
const NFT = artifacts.require("MockNFT.sol");

const CATEGORIES = {
  ART: 0,
  GAME: 1,
  DEFI: 2,
};

module.exports = async function(deployer, _network, addresses) {
  const [admin, seller, buyer1, buyer2, buyer3, _] = addresses;

  //Deploy NFT
  await deployer.deploy(NFT, 'My NFT', 'NFT');
  const nft = await NFT.deployed();
  await Promise.all([
    nft.mint(seller, 1),
    nft.mint(seller, 2),
    nft.mint(seller, 3),
    nft.mint(seller, 4),
    nft.mint(seller, 5),
    nft.mint(seller, 6),
    nft.mint(seller, 7),
    nft.mint(seller, 8),
    nft.mint(seller, 9),
    nft.mint(seller, 10)
  ]);

  //Deploy market
  await deployer.deploy(Market);
  const market = await Market.deployed();
  await Promise.all([
    nft.approve(market.address, 1, {from: seller}),
    nft.approve(market.address, 2, {from: seller}),
    nft.approve(market.address, 3, {from: seller}),
    nft.approve(market.address, 4, {from: seller}),
    nft.approve(market.address, 5, {from: seller})
  ]);
  await Promise.all([
    market.createAuction(
      nft.address,
      1,
      web3.utils.toWei('1'),
      CATEGORIES.ART,
      {from: seller}
    ),
    market.createAuction(
      nft.address,
      2,
      web3.utils.toWei('1'),
      CATEGORIES.ART,
      {from: seller}
    ),
    market.createAuction(
      nft.address,
      3,
      web3.utils.toWei('1'),
      CATEGORIES.ART,
      {from: seller}
    ),
    market.createAuction(
      nft.address,
      4,
      web3.utils.toWei('1'),
      CATEGORIES.GAME,
      {from: seller}
    ),
    market.createAuction(
      nft.address,
      5,
      web3.utils.toWei('1'),
      CATEGORIES.GAME,
      {from: seller}
    ),
  ]);
  await Promise.all([
    market.createBid(
      nft.address,
      1,
      {from: buyer1, value: web3.utils.toWei('2')}
    ),
    market.createBid(
      nft.address,
      2,
      {from: buyer2, value: web3.utils.toWei('2')}
    ),
    market.createBid(
      nft.address,
      3,
      {from: buyer3, value: web3.utils.toWei('2')}
    ),
    market.createBid(
      nft.address,
      4,
      {from: buyer1, value: web3.utils.toWei('3')}
    ),
    market.createBid(
      nft.address,
      5,
      {from: buyer2, value: web3.utils.toWei('3')}
    )
  ]);
};
