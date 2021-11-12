require("dotenv").config();
const Web3 = require("web3");
const abis = require("./abis");
const { mainnet: addresses } = require("./addresses");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(process.env.WSS_URL)
);
const { address: admin } = web3.eth.accounts.wallet.add(
  process.env.PRIVATE_KEY
);

const flashloanBUSD = "10000";
const flashloanWBNB = "100";
const amountInBUSD = web3.utils.toBN(web3.utils.toWei(flashloanBUSD));
const amountInWBNB = web3.utils.toBN(web3.utils.toWei(flashloanWBNB));

const ApeSwap = new web3.eth.Contract(
  abis.apeSwap.router,
  addresses.apeSwap.router
);

const PancakeSwap = new web3.eth.Contract(
  abis.pancakeSwap.router,
  addresses.pancakeSwap.router
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

      const amountsOut3 = await PancakeSwap.methods
        .getAmountsOut(amountInBUSD, [
          addresses.tokens.BUSD,
          addresses.tokens.WBNB,
        ])
        .call();
      const amountsOut4 = await PancakeSwap.methods
        .getAmountsOut(amountInWBNB, [
          addresses.tokens.WBNB,
          addresses.tokens.BUSD,
        ])
        .call();

      const aperesults = {
        buy: (amountInBUSD / amountsOut1[1]) * flashloanWBNB,
        sell: (amountsOut2[1] / amountInWBNB) * flashloanWBNB,
      };
      const aperesults2 = {
        buy: (amountInWBNB / amountsOut2[1]) * flashloanBUSD,
        sell: (amountsOut1[1] / amountInBUSD) * flashloanBUSD,
      };

      const pancakeresults = {
        buy: (amountInBUSD / amountsOut3[1]) * flashloanWBNB,
        sell: (amountsOut4[1] / amountInWBNB) * flashloanWBNB,
      };
      const pancakeresults2 = {
        buy: (amountInWBNB / amountsOut4[1]) * flashloanBUSD,
        sell: (amountsOut3[1] / amountInBUSD) * flashloanBUSD,
      };

      console.log("ApeSwap WBNB/BUSD");
      console.log(aperesults);

      console.log("PancakeSwap WBNB/BUSD");
      console.log(pancakeresults);

      console.log("ApeSwap BUSD/WBNB");
      console.log(aperesults2);

      console.log("PancakeSwap BUSD/WBNB");
      console.log(pancakeresults2);

      //Payback fee calc

      const pancakeBnbPrice =
        (pancakeresults.buy + pancakeresults.sell) / flashloanWBNB / 2;
      const apeswapBnbPrice =
        (aperesults.buy + aperesults.sell) / flashloanWBNB / 2;

      let pancakePaybackCalcBusd = (pancakeresults.buy / 0.997) * 10 ** 18;
      let apeswapPaybackCalcBusd = (aperesults.buy / 0.997) * 10 ** 18;
      let apePaybackCalcWbnb = (aperesults2.buy / 0.997) * 10 ** 18;
      let pancakePaybackCalcWbnb = (pancakeresults2.buy / 0.997) * 10 ** 18;

      let repayBusdPancakeFee =
        pancakePaybackCalcBusd / 10 ** 18 - pancakeresults.buy;
      let repayBusdApeswapFee =
        apeswapPaybackCalcBusd / 10 ** 18 - aperesults.buy;
      let repayWbnbPancakeFee =
        (pancakePaybackCalcWbnb / 10 ** 18 - pancakeresults2.buy) *
        pancakeBnbPrice;
      let repayWbnbApeswapFee =
        (apePaybackCalcWbnb / 10 ** 18 - aperesults2.buy) * apeswapBnbPrice;

      const gasPrice = await web3.eth.getGasPrice();
      const txCost =
        ((330000 * parseInt(gasPrice)) / 10 ** 18) * pancakeBnbPrice;

      //Profit Calc
      const profit1 =
        aperesults.sell - pancakeresults.buy - txCost - repayBusdApeswapFee;
      const profit2 =
        pancakeresults.sell - aperesults.buy - txCost - repayBusdPancakeFee;
      const profit3 =
        pancakeresults2.sell - aperesults2.buy - txCost - repayWbnbPancakeFee;
      const profit4 =
        aperesults2.sell - pancakeresults2.buy - txCost - repayWbnbApeswapFee;

      if (profit1 > 0 && profit1 > profit2) {
        console.log("Arb opportunity found!");
        console.log(`Flashloan WBNB on Apeswap at ${aperesults.buy} `);
        console.log(`Sell WBNB on PancakeSwap at ${pancakeresults.sell} `);
        console.log(`Expected cost of flashswap: ${repayBusdPancakeFee}`);
        console.log(`Expected Gas cost: ${txCost}`);
        console.log(`Expected profit: ${profit1} BUSD`);

        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.WBNB, //token1
          addresses.tokens.BUSD, //token2
          amountInWBNB.toString(), //amount0
          0, //amount1
          addresses.apeSwap.factory, //apefactory
          addresses.pancakeSwap.router, //pancakerouter
          pancakePaybackCalcBusd.toString()
        );
      }

      if (profit2 > 0 && profit2 > profit1) {
        console.log("Arb opportunity found!");
        console.log(`Buy WBNB from PancakeSwap at ${pancakeresults.buy} `);
        console.log(`Sell WBNB from ApeSwap at ${aperesults.sell}`);
        console.log(`Expected cost of flashswap: ${repayBusdApeswapFee}`);
        console.log(`Expected Gas cost: ${txCost}`);
        console.log(`Expected profit: ${profit2} BUSD`);

        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.WBNB, //token1
          addresses.tokens.BUSD, //token2
          amountInWBNB.toString(), //amount0
          0, //amount1
          addresses.pancakeSwap.factory, //pancakefactory
          addresses.apeSwap.router, // aperouter
          repayBusdPancakeswap[1].toString()
        );
      }

      if (profit3 > 0 && profit3 > profit4) {
        console.log("Arb opportunity found!");
        console.log(`Flashloan BUSD on Apeswap at ${aperesults2.buy} `);
        console.log(`Sell BUSD on PancakeSwap at ${pancakeresults2.sell} `);
        console.log(`Expected cost of flashswap: ${repayWbnbApeswapFee}`);
        console.log(`Expected Gas cost: ${txCost}`);
        console.log(`Expected profit: ${profit3} WBNB`);

        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.BUSD, //token1
          addresses.tokens.WBNB, //token2
          0, //amount0
          amountInBUSD.toString(), //amount1
          addresses.apeSwap.factory, //apefactory
          addresses.pancakeSwap.router, //pancakerouter
          apePaybackCalcWbnb.toString()
        );
      }

      if (profit4 > 0 && profit4 > profit3) {
        console.log("Arb opportunity found!");
        console.log(`Flashloan BUSD on PancakeSwap at ${pancakeresults2.buy} `);
        console.log(`Sell BUSD on  at Apeswap ${aperesults2.sell} `);
        console.log(`Expected cost of flashswap: ${repayWbnbPancakeFee}`);
        console.log(`Expected Gas cost: ${txCost}`);
        console.log(`Expected profit: ${profit4} WBNB`);

        let tx = flashloan.methods.startArbitrage(
          //token1
          addresses.tokens.WBNB,
          addresses.tokens.BUSD, //token2
          0, //amount0
          amountInBUSD.toString(), //amount1
          addresses.pancakeSwap.factory, //pancakeFactory
          addresses.apeSwap.router, //apeRouter
          pancakePaybackCalcWbnb.toString()
        );
      }
    })
    .on("error", (error) => {
      console.log(error);
    });
};
init();

    .on("error", (error) => {
      console.log(error);
    });
};
init();
