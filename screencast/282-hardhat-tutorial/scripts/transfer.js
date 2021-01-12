async function main() {
  const [deployer, addr1, addr2, _] = await ethers.getSigners();
  
  const Token = await ethers.getContractFactory('Token');
  const token = await Token.deploy();
  await token.connect(addr1).transfer(addr2.address, 1000);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
