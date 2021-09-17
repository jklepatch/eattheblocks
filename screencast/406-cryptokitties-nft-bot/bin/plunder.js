#! /usr/bin/env node

//Add more modules here for other assets
const kitties = require("./cryptokitties");
const axies = require("./axies");

var argv = require('yargs')
    .usage('Usage: $0 -wallet_mnemonic [string of words inside quotes] -wallet_address [ethereum address] -eth_budget [num] -eth_price_threshold [num] increase_percentage [number 0 - 100] -asset_classes [cryptokitties,axie]')
    .demandOption(['wallet_mnemonic','wallet_address', 'eth_budget', 'eth_price_threshold', 'increase_percentage', 'asset_classes'])
    .argv;

    /* Example
    plunderbot --wallet_mnemonic "apple biscuit church" --wallet_address 0x123abc --eth_budget 0.5 --eth_price_threshold 0.01 --increase_percentage 5 --asset_classes cryptokitties,axies
    */
    //for testing, print the args out and what has been picked up for each arg.
    //console.log(argv); //DEBUG

    const sender = argv.wallet_address.toString(16); //convert to hex
    //console.log("sender = " + sender); //DEBUG


/* Sanity Checks */

// make sure the price threshold is smaller than budget and is a small-ish number. TODO
// if its not a good small number give a warning and suggestion TODO

//check which type of asset to look for
//Each asset is done in its own
const type = argv.asset_classes.toString();

//router to correct file for arbitrage.
if(type.includes("cryptokitties") && type.includes("axies")){
    //multiple calls should made async. Not supported by Node less than 7.6
    kitties.CryptoKittyArbitrage(argv);
    axies.AxiesArbitrage(argv);

}else if(type.includes("cryptokitties")){
    kitties.CryptoKittyArbitrage(argv);

}else if( type.includes("axies")){
    axies.AxiesArbitrage(argv);
}else{
    throw new Error('Type of asset unknown. Try cryptokitties.');
}
