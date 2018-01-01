# ETB Ethereum ToDo List

## Getting Started

Prerequisite:
* Node v8.9.0, NPM v 4.0.5
* Truffle: `npm install -g truffle`
* Ethereumjs testrpc: `npm install -g ethereumjs-testrpc`
* (optional, for dev) nodemon: `npm install -g nodemon`

Launching the app:
* Open a terminal and start an Ethereum local testnet with the `testrpc` command
* Open another terminal and Install npm dependencies with `npm install`
* In the other terminal or a new one, start the app: `npm start`, then visit `localhost:3000` in your browser

## Development

For developing, you need to launch a local testnet and install npm dependencies like
explained in the `Getting Started` section. However, for starting the app itself it is
a little bit different if you want to take advantage of watchers:
* In a terminal, run `npm run dev-back` to start the node server. It is started with nodemon
  which will reload the server everytime a file changes
* In another terminal, run `npm run dev` to start the webpack watcher. It will rebuild `bundle.js` everytime a source file is changed.

The web application lives in the `app` folder. There is a single index.html
file that is loaded when the application starts, and all the front-end code lives
is bundled in the `app/dist/bundle.js` file. The source files for the front are
in the `app/js` folder.

The smart contract that is used to power the app is `ToDo.sol`, in the `/contracts`
folder. Everytime you change something to the smart contract, you need to re-deploy
the latest version of your contract to your local testnet with the following 
command: `truffle migrate --reset`, and reload the frontend by pressing F5. 
Sometime it is not enough and you also need to delete the outdated contract artifacts with the command `rm -rf build`. 

In any case, the front-end is always in sync with the contract address that is referenced in `build/contracts/ToDo.json` (you need to run `truffle migrate` before you
can see an address in this file).

## Links
* Eat The Blocks [website](https://eattheblocks.com)
* Eat The Blocks [YouTube Channel](https://www.youtube.com/channel/UCZM8XQjNOyG2ElPpEUtNasA)
* Truffle framework [website](http://truffleframework.com)
* Ethereumjs testnet [website](https://www.npmjs.com/package/ethereumjs-testrpc)
* Solidity docs [website](https://solidity.readthedocs.io/en/develop)