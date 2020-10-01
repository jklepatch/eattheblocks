const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
const SushiToken = artifacts.require('SushiToken.sol') 
const MasterChef = artifacts.require('MasterChef.sol'); 
const SushiBar = artifacts.require('SushiBar.sol');
const SushiMaker = artifacts.require('SushiMaker.sol');
const Migrator = artifacts.require('Migrator.sol');

module.exports = async function(deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(WETH);
  const weth = await WETH.deployed();
  const tokenA = await MockERC20.new('Token A', 'TKA', web3.utils.toWei('1000'));
  const tokenB = await MockERC20.new('Token B', 'TKB', web3.utils.toWei('1000'));

  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();
  await factory.createPair(weth.address, tokenA.address);
  await factory.createPair(weth.address, tokenB.address);
  await deployer.deploy(Router, factory.address, weth.address);
  const router = await Router.deployed();

  await deployer.deploy(SushiToken);
  const sushiToken = await SushiToken.deployed();

  await deployer.deploy(
    MasterChef,
    sushiToken.address,
    admin,
    web3.utils.toWei('100'),
    1,
    1
  );
  const masterChef = await MasterChef.deployed();
  await sushiToken.transferOwnership(masterChef.address);

  await deployer.deploy(SushiBar, sushiToken.address);
  const sushiBar = await SushiBar.deployed();

  await deployer.deploy(
    SushiMaker,
    factory.address, 
    sushiBar.address, 
    sushiToken.address, 
    weth.address
  );
  const sushiMaker = await SushiMaker.deployed();
  await factory.setFeeTo(sushiMaker.address);

  await deployer.deploy(
    Migrator,
    masterChef.address,
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    factory.address,
    1
  );
};
