# Polygon Matic bridge for ERC20

1. Run
```
yarn install
```

2. Populate the src/infura.js file with the url of your endpoint to Ethereum.

3. Run the app with
```
yarn run start
```
The app will be available at
```
http://localhost:3000/
```

4. Make sure you have Matic Mumbai testnet set in you metamask as well as matic tokens on the matic testnet, and ether + test erc20 tokens on the Ethereum Goerli testnet.

5. From the Goerli testnet, run Approve.

6. From the Goerli testnet, run Deposit.

7. Wait for ~10 minutes, your tokens should be available on Matic testnet.

8. From the Matic testnet, run Burn. Copy the transaction hash that appears in the window.

9. Wait for ~15 minutes (can be more), paste the burn transaction hash in the input and from the Goerli testnet, and run Exit. You erc20 tokens should be back on your Goerli wallet !

*Don't forget to refresh the page when you change network*