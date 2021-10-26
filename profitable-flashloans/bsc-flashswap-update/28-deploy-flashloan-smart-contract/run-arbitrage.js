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
const Flashloan = require("./build/contracts/FlashSwap.json");

const amountInBUSD = web3.utils.toBN(web3.utils.toWei("480"));
const amountInWBNB = web3.utils.toBN(web3.utils.toWei("1"));

const ApeSwap = new web3.eth.Contract(
  abis.apeSwap.router,
  addresses.apeSwap.router
);

const PancakeSwap = new web3.eth.Contract(
  abis.pancakeSwap.router,
  addresses.pancakeSwap.router
);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const init = async () => {
  const networkId = await web3.eth.net.getId();
  const flashloan = new web3.eth.Contract(
    Flashloan.abi,
    Flashloan.networks[networkId].address
  );

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
        buy: ((amountInBUSD / amountsOut1[1]) * amountInWBNB) / 10 ** 18,
        sell: ((amountsOut2[1] / amountInWBNB) * amountInWBNB) / 10 ** 18,
      };
      const aperesults2 = {
        buy: ((amountInWBNB / amountsOut2[1]) * amountInBUSD) / 10 ** 18,
        sell: ((amountsOut1[1] / amountInBUSD) * amountInBUSD) / 10 ** 18,
      };

      const pancakeresults = {
        buy: ((amountInBUSD / amountsOut3[1]) * amountInWBNB) / 10 ** 18,
        sell: ((amountsOut4[1] / amountInWBNB) * amountInWBNB) / 10 ** 18,
      };
      const pancakeresults2 = {
        buy: ((amountInWBNB / amountsOut4[1]) * amountInBUSD) / 10 ** 18,
        sell: ((amountsOut3[1] / amountInBUSD) * amountInBUSD) / 10 ** 18,
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
      const pancakePaybackCalcBusd = (pancakeresults.buy * 1000) / 996;
      const pancakePaybackBusd = web3.utils.toBN(
        web3.utils.toWei(pancakePaybackCalcBusd.toString())
      );
      const fee1 = pancakePaybackCalcBusd - pancakeresults.buy;

      const apeSwapPaybackCalcBusd = (aperesults.buy * 1000) / 996;
      const apeSwapPaybackBusd = web3.utils.toBN(
        web3.utils.toWei(apeSwapPaybackCalcBusd.toString())
      );
      const fee2 = apeSwapPaybackCalcBusd - aperesults.buy;

      const pancakePaybackCalcWbnb = (pancakeresults2.buy * 1000) / 996;
      const pancakePaybackWbnb = web3.utils.toBN(
        web3.utils.toWei(pancakePaybackCalcWbnb.toString())
      );
      const fee3 = pancakePaybackCalcWbnb - pancakeresults2.buy;

      const apeSwapPaybackCalcWbnb = (aperesults2.buy * 1000) / 996;
      const apeSwapPaybackWbnb = web3.utils.toBN(
        web3.utils.toWei(apeSwapPaybackCalcWbnb.toString())
      );
      const fee4 = apeSwapPaybackCalcWbnb - aperesults2.buy;

      const gasPrice = await web3.eth.getGasPrice();
      const txCost = 330000 * parseInt(gasPrice);
      const currentBNBPrice = (pancakeresults.buy + pancakeresults.sell) / 2;

      //Profit Calc
      const profit1 =
        amountInWBNB * (aperesults.sell - pancakeresults.buy) -
        (txCost / 10 ** 18) * currentBNBPrice +
        fee1.toString();
      const profit2 =
        amountInWBNB * (pancakeresults.sell - aperesults.buy) -
        (txCost / 10 ** 18) * currentBNBPrice +
        fee2.toString();
      const profit3 =
        amountInBUSD * (pancakeresults2.sell - aperesults2.buy) -
        (txCost / 10 ** 18) * currentBNBPrice +
        fee3.toString();
      const profit4 =
        amountInBUSD * (aperesults2.sell - pancakeresults2.buy) -
        (txCost / 10 ** 18) * currentBNBPrice +
        fee4.toString();

      if (profit1 > 0 && profit1 > profit2) {
        console.log("Arb opportunity found!");
        console.log(`Flashloan WBNB on Apeswap at ${aperesults.buy} `);
        console.log(`Sell WBNB on PancakeSwap at ${pancakeresults.sell} `);
        console.log(`Expected profit: ${profit1} BUSD`);

        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.WBNB, //token1
          addresses.tokens.BUSD, //token2
          amountInWBNB.toString(), //amount0
          0, //amount1
          addresses.apeSwap.factory, //apefactory
          addresses.pancakeSwap.router, //pancakerouter
          pancakePaybackBusd.toString()
        );

        const data = tx.encodeABI();
        const txData = {
          from: admin,
          to: flashloan.options.address,
          data,
          gas: "330000",
          gasPrice: gasPrice,
        };
        const receipt = await web3.eth.sendTransaction(txData);
        console.log(`Transaction hash: ${receipt.transactionHash}`);
        console.log("Waiting a block as to not redo transaction in same block");
        sleep(3000);
      }

      if (profit2 > 0 && profit2 > profit1) {
        console.log("Arb opportunity found!");
        console.log(`Buy WBNB from PancakeSwap at ${pancakeresults.buy} `);
        console.log(`Sell WBNB from ApeSwap at ${aperesults.sell}`);
        console.log(`Expected profit: ${profit2} BUSD`);

        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.WBNB, //token1
          addresses.tokens.BUSD, //token2
          amountInWBNB.toString(), //amount0
          0, //amount1
          addresses.pancakeSwap.factory, //pancakefactory
          addresses.apeSwap.router, // aperouter
          apeSwapPaybackBusd.toString()
        );

        const data = tx.encodeABI();
        const txData = {
          from: admin,
          to: flashloan.options.address,
          data,
          gas: "330000",
          gasPrice: gasPrice,
        };
        const receipt = await web3.eth.sendTransaction(txData);
        console.log(`Transaction hash: ${receipt.transactionHash}`);
        console.log("Waiting a block as to not redo transaction in same block");
        sleep(3000);
      }

      if (profit3 > 0 && profit3 > profit4) {
        console.log("Arb opportunity found!");
        console.log(`Flashloan BUSD on Apeswap at ${aperesults.buy} `);
        console.log(`Sell BUSD on PancakeSwap at ${pancakeresults.sell} `);
        console.log(`Expected profit: ${profit3} WBNB`);

        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.BUSD, //token1
          addresses.tokens.WBNB, //token2
          amountInBUSD.toString(), //amount0
          0, //amount1
          addresses.apeSwap.factory, //apefactory
          addresses.pancakeSwap.router, //pancakerouter
          pancakePaybackWbnb.toString()
        );

        const data = tx.encodeABI();
        const txData = {
          from: admin,
          to: flashloan.options.address,
          data,
          gas: "330000",
          gasPrice: gasPrice,
        };
        const receipt = await web3.eth.sendTransaction(txData);
        console.log(`Transaction hash: ${receipt.transactionHash}`);
        console.log("Waiting a block as to not redo transaction in same block");
        sleep(3000);
      }
      if (profit4 > 0 && profit4 > profit3) {
        console.log("Arb opportunity found!");
        console.log(`Flashloan BUSD on Apeswap at ${aperesults.buy} `);
        console.log(`Sell BUSD on PancakeSwap at ${pancakeresults.sell} `);
        console.log(`Expected profit: ${profit4} WBNB`);

        let tx = flashloan.methods.startArbitrage(
          addresses.tokens.BUSD, //token1
          addresses.tokens.WBNB, //token2
          amountInBUSD.toString(), //amount0
          0, //amount1
          addresses.apeSwap.factory, //apefactory
          addresses.pancakeSwap.router, //pancakerouter
          apeSwapPaybackWbnb.toString()
        );

        const data = tx.encodeABI();
        const txData = {
          from: admin,
          to: flashloan.options.address,
          data,
          gas: "330000",
          gasPrice: gasPrice,
        };
        const receipt = await web3.eth.sendTransaction(txData);
        console.log(`Transaction hash: ${receipt.transactionHash}`);
        console.log("Waiting a block as to not redo transaction in same block");
        sleep(3000);
      }
    })
    .on("error", (error) => {
      console.log(error);
    });
};
init();
