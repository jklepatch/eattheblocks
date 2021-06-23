# Digital marketplace on Ethererum

This is the completed version of the NFT marketplace app from the attached [workshop](https://github.com/dabit3/full-stack-ethereum-marketplace-workshop).

## Getting Started

First, clone the repo and install the dependencies:

```sh
git clone https://github.com/dabit3/full-stack-ethereum-marketplace-workshop.git

cd full-stack-ethereum-marketplace-workshop/marketplace-example

yarn

# or

npm install
```

Next, run a local Ethereum node:

```sh
npx hardhat node
```

Deploy the smart contract to the local node:

```sh
npx hardhat run scripts/deploy.js --network localhost
```

Running the above command should print out the addresses where the contract was deployed. Update `config.js` with those values:

```javascript
export const nftaddress = "nft-contract-address"
export const nftmarketaddress = "marketplace-address"
```

Next, run the development server:

```bash
npm run dev
# or
yarn dev
```
