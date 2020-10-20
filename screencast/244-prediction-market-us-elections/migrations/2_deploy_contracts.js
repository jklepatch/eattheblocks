const PredictionMarket = artifacts.require('PredictionMarket');

const Side = {
  Biden: 0,
  Trump: 1
};

module.exports = async function (deployer, _network, addresses) {
  const [admin, oracle, gambler1, gambler2, gambler3, gambler4, _] = addresses;
  await deployer.deploy(PredictionMarket, oracle);
  const predictionMarket = await PredictionMarket.deployed();
  await predictionMarket.placeBet(
    Side.Biden, 
    {from: gambler1, value: web3.utils.toWei('1')}
  );
  await predictionMarket.placeBet(
    Side.Biden, 
    {from: gambler2, value: web3.utils.toWei('1')}
  );
  await predictionMarket.placeBet(
    Side.Biden, 
    {from: gambler3, value: web3.utils.toWei('2')}
  );
  await predictionMarket.placeBet(
    Side.Trump, 
    {from: gambler4, value: web3.utils.toWei('1')}
  );
};
