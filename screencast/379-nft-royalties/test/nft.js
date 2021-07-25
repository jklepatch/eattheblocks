const { expect } = require('chai');

describe('NFT', async () =>  {
  let admin, artist, owner1, owner2;
  const txFee = ethers.utils.parseUnits('1', 'ether');  
  let token, nft;


  beforeEach(async () => {
    ([admin, artist, owner1, owner2] = await ethers.getSigners());
    const Token = await ethers.getContractFactory('MockToken');
    token = await Token.deploy();
    await token.deployed();
    await token.transfer(
      owner1.address, 
      ethers.utils.parseUnits('500', 'ether')
    );
    await token.transfer(
      owner2.address, 
      ethers.utils.parseUnits('500', 'ether')
    );
    const NFT  = await ethers.getContractFactory('NFT');
    nft = await NFT.deploy(artist.address, token.address, txFee);
    await nft.deployed();
  });

  it('Should transfer NFT and pay royalties', async () => {
    let ownerNFT, balanceSender, balanceArtist;

    nft =  nft.connect(artist);
    await nft.transferFrom(
      artist.address, 
      owner1.address, 
      0
    );
    ownerNFT = await nft.ownerOf(0)
    expect(ownerNFT)
      .to
      .equal(owner1.address);

    await token.connect(owner1).approve(nft.address, txFee);  
    await nft.connect(owner1).transferFrom(
      owner1.address, 
      owner2.address, 
      0
    );
    ownerNFT = await nft.ownerOf(0);
    balanceSender = await token.balanceOf(owner1.address);
    balanceArtist = await token.balanceOf(artist.address);
    expect(ownerNFT)
      .to
      .equal(owner2.address);
    expect(balanceSender.toString())
      .to
      .equal(ethers.utils.parseUnits('499', 'ether'));
    expect(balanceArtist.toString())
      .to
      .equal(ethers.utils.parseUnits('1', 'ether'));
  });

  it('Should not pay royalties if in excludedList', async () => {
    let balanceSender, balanceArtist;

    nft =  nft.connect(artist);
    await nft.transferFrom(
      artist.address, 
      owner1.address, 
      0
    );
    balanceArtist = await token.balanceOf(artist.address);
    expect(balanceArtist)
      .to
      .equal(0);

    await nft.setExcluded(owner1.address, true);
    nft =  nft.connect(owner1);
    await nft.transferFrom(
      owner1.address, 
      owner2.address, 
      0
    );
    balanceSender = await token.balanceOf(owner1.address);
    balanceArtist = await token.balanceOf(artist.address);
    expect(balanceSender)
      .to
      .equal(ethers.utils.parseUnits('500', 'ether'));
    expect(balanceArtist)
      .to
      .equal(0);
  });

  it('Should not transfer NFT if not enough token for royalties', async () => {
    nft =  nft.connect(artist);
    await nft.transferFrom(
      artist.address, 
      owner1.address, 
      0
    );
    token = token.connect(owner1);
    await token.transfer(owner2.address, ethers.utils.parseUnits('500'));  
    await token.approve(nft.address, txFee);  
    nft = nft.connect(owner1);

    await expect(nft.transferFrom(owner1.address, owner2.address, 0))
      .to.be.revertedWith('ERC20: transfer amount exceeds balance');
  });

  it('Should add/remove from excludedList', async () => {
    nft =  nft.connect(artist);
    await nft.setExcluded(owner1.address, true);
    expect(await nft.excludedList(owner1.address))
      .to.equal(true);
    await nft.setExcluded(owner1.address, false);
    expect(await nft.excludedList(owner1.address))
      .to.equal(false);

    nft = nft.connect(owner2);
    await expect(nft.setExcluded(owner2.address, true))
      .to.be.revertedWith('artist only');
  });
});
