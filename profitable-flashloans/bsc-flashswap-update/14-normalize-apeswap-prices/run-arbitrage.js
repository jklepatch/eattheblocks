require("dotenv").config();
const Web3 = require("web3");
const abis = require("./abis");
const { mainnet: addresses } = require("./addresses");
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.WSS_URL)
);

const flashloanBUSD = "10000";
const flashloanWBNB = "100";
const amountInBUSD = web3.utils.toBN(web3.utils.toWei(flashloanBUSD));
const amountInWBNB = web3.utils.toBN(web3.utils.toWei(flashloanWBNB));

const ApeSwap = new web3.eth.Contract(
  abis.apeSwap.router,
  addresses.apeSwap.router
);

const init = async () => {
  const networkId = await web3.eth.net.getId();

  web3.eth
    .subscribe("newBlockHeaders")
    .on("data", async (block) => {
      console.log(`New block received. Block # ${block.number}`);

      const amountsOut1 = await ApeSwap.methods
        .getAmountsIn(amountInBUSD, [
          addresses.tokens.WBNB,
          addresses.tokens.BUSD,
        ])
        .call();
      const amountsOut2 = await ApeSwap.methods
        .getAmountsOut(amountInBUSD, [
          addresses.tokens.BUSD,
          addresses.tokens.WBNB,
        ])
        .call();

      const amountsOut5 = await ApeSwap.methods
        .getAmountsIn(amountInWBNB, [
          addresses.tokens.BUSD,
          addresses.tokens.WBNB,
        ])
        .call();
      const amountsOut6 = await ApeSwap.methods
        .getAmountsOut(amountInWBNB, [
          addresses.tokens.WBNB,
          addresses.tokens.BUSD,
        ])
        .call();

      const aperesults = {
        buy: amountsOut1[0] / 10 ** 18,
        sell: amountsOut2[1] / 10 ** 18,
      };
      const aperesults2 = {
        buy: amountsOut5[0] / 10 ** 18,
        sell: amountsOut6[1] / 10 ** 18,
      };

      console.log(`ApeSwap ${flashloanBUSD} BUSD/WBNB `);
      console.log(aperesults);

      console.log(`ApeSwap ${flashloanWBNB} WBNB/BUSD`);
      console.log(aperesults2);
    })
    .on("error", (error) => {
      console.log(error);
    });
};
init();
