var HDWalletProvider = require("truffle-hdwallet-provider");
var Web3 = require("web3");
var walletAPIUrl = "https://mainnet.infura.io/v3/8235d0efb49f4a8eaacdb0544078d834";

const opensea = require("opensea-js");
var hh = require("http-https");
var bn = require("bignumber.js");
const helper = require("./helpers.js"); //local file.

function CryptoKittyArbitrage(argv) {
    //console.log("finding kitties under " + argv.eth_price_threshold);

    var mnemonic = argv.wallet_mnemonic;

    //use mnemonic as provider for web3
    const provider = new HDWalletProvider(
        mnemonic,
        walletAPIUrl
    );

    //web3 isntance setup complete
    //NOTE: This is use the primary count number of the mnemonic
    const web3 = new Web3(provider);
    var starting_balance_wei = helper.checkETHBalance(web3); //TODO make callback


    //get all for sale kitties from open sea api
    const seaport = new opensea.OpenSeaPort(provider, {
        networkName: opensea.Network.Main
    });


    var search = true;
    var amount_spent = 0;
    var total_kitties_bought = 0;
    var starting_balance_eth = starting_balance_wei.times(1e18);
    //make sure you have enough ETH in account.
    if (argv.eth_budget > starting_balance_eth.toNumber()) {
        //The amount you want to spend is more than
        console.error("Your ETH budget is greater than your balance. Try setting a lower budget or getting more ETH");
        search = false;
        console.log("start: ", starting_balance_eth.toNumber());
        console.log("budget: ", argv.eth_budget);
    }

    console.log("Start plundering");
    /*===================================================
    Requirements to plunder:
    - There is enough eth in your account to buy things.
    - The amount spent on buying has not exceeded your budget.
    - something else has not gone wrong (search == false), like web request fails
    =======================================================*/
    while (search && argv.eth_bal > 0.000001 && argv.eth_budget > amount_spent) { //go forth and artbitrage while you still have funds
        search = false; //REMOVE TODO

        //check for ones less than argv.eth_price_threshold
        var cheapest_kitty = helper.getCheapKitty()

        //make sure this kitty is within our budget and balance TODO

        //buy cheap kitty via web3 call to kitty_address = auction contract
        var buy_result = helper.buyKitty(web3, cheapest_kitty)

        //increment how much we have spent and number of bought kitties
        if (buy_result == 200) {
          amount_spent += cheapest_kitty.auction.current_price;
          total_kitties_bought++;

          var sell_price = price + (price * argv.increase_percentage / 100);
          const expirationTime = (Date.now() / 30000 + 60 * 60 * 24); //sell order is live for 30 days. //TODO allow user to set order time

          //SELL on open sea
          //We do not use 'await' here because we want to keep plundering.//TODO Async issues
          const auction = seaport.createSellOrder({
              kitty.id,
              kitty_address,
              argv.wallet_address,
              sell_price,
              sell_price,
              expirationTime
          })
        }

    } //End search
    //TODO how many kitties were bought?
    console.log("... plundering over.")
    provider.engine.stop();

} //END FUNCTION

module.exports.CryptoKittyArbitrage = CryptoKittyArbitrage;
