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
        .getAmountsOut(amountInBUSD, [
          addresses.tokens.BUSD,
          addresses.tokens.WBNB,
        ])
        .call();
      const amountsOut2 = await ApeSwap.methods
        .getAmountsOut(amountInWBNB, [
          addresses.tokens.WBNB,
          addresses.tokens.BUSD,
        ])
        .call();

      const aperesults = {
        buy: (amountInBUSD / amountsOut1[1]) * amountInWBNB,
        sell: (amountsOut2[1] / amountInWBNB) * amountInWBNB,
      };
      const aperesults2 = {
        buy: (amountInWBNB / amountsOut2[1]) * amountInBUSD,
        sell: (amountsOut1[1] / amountInBUSD) * amountInBUSD,
      };

      console.log("ApeSwap WBNB/BUSD");
      console.log(aperesults);

      console.log("ApeSwap BUSD/WBNB");
      console.log(aperesults2);
    })
    .on("error", (error) => {
      console.log(error);
    });
};
init();
