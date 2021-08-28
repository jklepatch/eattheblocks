const NFT = artifacts.require('NFT.sol');
const Airdrop = artifacts.require('NFTAirdrop.sol');

contract('NFTAirdrop', accounts => {
  let nft, airdrop;
  const [admin, recipient1, recipient2, recipient3, _] = accounts;

  beforeEach(async () => {
    nft = await NFT.new();
    airdrop = await Airdrop.new();
    await nft.setApprovalForAll(airdrop.address, true);
  });

  it('should airdrop', async () => {
    await airdrop.addAirdrops([
      {nft: nft.address, id: 0},
      {nft: nft.address, id: 1},
      {nft: nft.address, id: 2},
    ]);
    await airdrop.addRecipients([recipient1, recipient2, recipient3]); 
    await airdrop.claim({from: recipient1});
    await airdrop.claim({from: recipient2});
    await airdrop.claim({from: recipient3});
    const owner1 = await nft.ownerOf(0);
    const owner2 = await nft.ownerOf(1);
    const owner3 = await nft.ownerOf(2);
    assert(owner1 === recipient1);
    assert(owner2 === recipient2);
    assert(owner3 === recipient3);
  });
});
