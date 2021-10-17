#! /usr/bin/env node

//=================== Helper Functions =====================//
/* Because of the very async nature of working with
* many APIs from NFT projects mixed with web3 calls
* A series of async helper functions will be kept here.
* These functions can be more easily nested in the main
* bin scripts for easier readability.
*/
var bn = require("bignumber.js");
var hh = require("http-https");



/* Get the user's ETH balance from web3.
*  Returns their balance as a number in ETH.
*/
function checkETHBalance (web3){
  var starting_balance_wei = new bn(-1);//must be negative, so if we can't

  var eth = web3.eth; //use web3 to check balanace:
  eth.getAccounts(function(err, accounts) {
    if(err != null){console.log(err);}
    else{
      eth.getBalance(accounts[0], function(err, bal){
        console.log("bal = ", bal);
        starting_balance_wei = bal;
        return bal;
      });
    }
  });
}

async function getKitty(){
  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
  console.log(err); // TypeError: failed to fetch
  }
}

async function getCheapKitty(){
  //note limit in the url is set to 1. this should be a variable, could be interesting TODO
  var cheap_kitty_url = "https://api.cryptokitties.co/v2/kitties?offset=0&limit=1&include=sale&parents=false&authenticated=false&orderBy=current_price&orderDirection=asc&total=true";
  // Identify cheap kitties
  var req = hh.get(cheap_kitty_url, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log("Arrrr, matey, we found somethin'");
    //Cheapest kitty is:
    var kitties = JSON.parse(data).kitties;
    var kitty = kitties[0];
    //console.log(kitty);

    var wei_price = kitty.auction.current_price;

    console.log("price in wei: ", wei_price);
    console.log("Kitty number: ", kitty.id);
  });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

  return kitty;
}

//pass a web3 object and the kitty json to buy
function buyKitty(web3, kitty){

    //Next line is the ABI. Maybe there is a better what to load this? This works for now
    var kittyABI =  [{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_startingPrice","type":"uint256"},{"name":"_endingPrice","type":"uint256"},{"name":"_duration","type":"uint256"},{"name":"_seller","type":"address"}],"name":"createAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"bid","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"lastGen0SalePrices","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdrawBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getAuction","outputs":[{"name":"seller","type":"address"},{"name":"startingPrice","type":"uint256"},{"name":"endingPrice","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"startedAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ownerCut","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isSaleClockAuction","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"cancelAuctionWhenPaused","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"gen0SaleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"cancelAuction","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getCurrentPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nonFungibleContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"averageGen0SalePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_nftAddr","type":"address"},{"name":"_cut","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"startingPrice","type":"uint256"},{"indexed":false,"name":"endingPrice","type":"uint256"},{"indexed":false,"name":"duration","type":"uint256"}],"name":"AuctionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"},{"indexed":false,"name":"totalPrice","type":"uint256"},{"indexed":false,"name":"winner","type":"address"}],"name":"AuctionSuccessful","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenId","type":"uint256"}],"name":"AuctionCancelled","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]

    var contract = new web3.eth.Contract(kittyABI);
    const kitty_address = '0xb1690c08e213a35ed9bab7b318de14420fb57d8c'; //auction contract. Set manually because this is CK buyer script
    contract.options.address = kitty_address;
    contract.options.from = argv.wallet_address;

    //id is kitty.id;
    //amount is kitty.auction.current_price
    //more on using the CK auction contract: https://etherscan.io/address/0xb1690c08e213a35ed9bab7b318de14420fb57d8c#writeContract

    //myContract.methods.myMethod([param1[, param2[, ...]]]).send(options[, callback])
    contract.methods.bid(kitty.id).send({"value":kitty.auction.current_price}).then(function(result) {
      console.log("bid result: ", result);
      // expected output: "Success!"
    }
}


//export functions for use elsewhere
module.exports.getCheapKitty = getCheapKitty;
module.exports.getKitty = getKitty;
module.exports.checkETHBalance = checkETHBalance;
