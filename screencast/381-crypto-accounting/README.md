# Description

Tool to easily do your crypto accounting as a merchant:
* It prints the list of Ethereum transactions of a specific address, over a time range 
* For each transaction, it calculates the P/L in USD
* It covers ETH & stablecoins transactions 
* This is for merchants which receives crypto payments
* It does not cover the needs of traders
* This is a CLI tool

It currently supports Ethereum, but can easily be adapted to other EVM Blockchains.

## Installation

* requires NodeJS v12 or up
* git clone the repo
* Run `npm install`

## Use

After installation, you need to do some configuration.

First, you need to take care of Google Sheets:
* create a new project in Google Cloud Platform:
* Create oauth2 credentials:
  * Chose Desktop app
  * For scope put `https://www.googleapis.com/auth/spreadsheets`
* Create a Google Sheet, to receive the transaction data

You also need to have Blockchain data:
* Create an Infura account, and create an API key
* Create Etherscan account, and create an API key

Create a configuration file:
* `mv .env-example .env`
* Update all the required values 
* IMPORTANT: Make sure to NOT commit `.env` to git!

Run the script:
* `node index.js`
hkkk
