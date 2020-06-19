# Aave Flash Loan Truffle Box
## :warning: [Known issue with latest version of Truffle (5.1.25)](https://github.com/trufflesuite/truffle/issues/3033).
### :white_check_mark: This box is working on Truffle v.5.1.0

This Truffle box comes with everything you need to start [developing on flash loans](https://docs.aave.com/developers/tutorials/performing-a-flash-loan/...-with-truffle)

## Installation and Setup

0. Install Truffle globally, if not already installed.
    ```
    npm install -g truffle
    ```
1. Download the box.
    ```
    truffle unbox aave/flashloan-box
    ```
2. Rename the `env` file to `.env` and edit the following values in the file:
    - Sign up for [Infura](https://infura.io/) (or a similar provider) and replace `YOUR_INFURA_KEY` with an API key for your project.
    - Replace `YOUR_ACCOUNT_KEY_FOR_DEPLOYMENT` with the private key of the ethereum account you will be using to deploy the contracts. This account will become the `owner` of the contract.
3. Ensure your ethereum account has some ETH to deploy the contract.
4. In your terminal, navigate to your repo directory and install the dependencies (if not already done):
    ```
    npm install
    ```
5. In the same terminal, replace `NAME_OF_YOUR_NETWORK` with either `kovan`, `ropsten`, or `mainnet` (depending on where you want to deploy the contract):
    ```
    truffle console --network NAME_OF_YOUR_NETWORK
    ```
6. You are now connected to the network you chose. In the same terminal window:
    ```
    migrate --reset
    ```
7. After a few minutes, your contract will be deployed on your chosen network.
    - If you have not added any profitable logic to `Flashloan.sol` line 23, then you will need to fund your contract with the desired asset.
    - See our [documentation](https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances#reserves-assets) for token address and faucets.
8. Call your contract's flashloan function within the truffle console, replacing `RESERVE_ADDRESS` with the [reserve address](https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances#reserves-assets) found in our documentation:
    ```
    let f = await Flashloan.deployed()
    await f.flashloan(RESERVE_ADDRESS)
    ```
    - if the above operation takes an unreasonably long time or timesout, try `CTRL+C` to exit the Truffle console, repeat step 5, then try this step agin. You may need to wait a few blocks before your node can 'see' the deployed contract.
9. If you've successfully followed the above steps, then congratulations, you've just made a flash loan.
    - For reference, here is an [example transaction](https://ropsten.etherscan.io/tx/0x7877238373ffface4fb2b98ca4db1679c64bc2c84c7754432aaab994a9b51e17) that followed the above steps on `Kovan` using **Dai**.
    - For reference, here is an [example transaction](https://ropsten.etherscan.io/tx/0x32eb3e03e00803dc19a7d2edd0a0a670756fbe210be81697be312518baeb16cc) that followed the above steps on `Kovan` using **ETH**.

## Setup for cross protocol flash lending
If you are working across protocols, such as using the flash loaned amount on another #DeFi protocol, sometimes it is easier to fork mainnet and use each protocol's production contracts and production ERC20 tokens.

1. Follow the steps 0 --> step 4 from above.
2. (Install and) Run [Ganache](https://www.trufflesuite.com/ganache), preferably the [CLI version](https://github.com/trufflesuite/ganache-cli)
3. In `truffle-config.js`, ensure the details for the `development` network match up with your running Ganache instance.
4. To minimise set up steps with Aave's lending pools, use Ganache's fork feature. This will 'fork' mainnet into your Ganache instance.
    Open terminal, replace `YOUR_INFURA_KEY` in the following and run:
    ```
    ganache-cli --fork https://mainnet.infura.io/v3/YOUR_INFURA_KEY -i 1
    ```
5. In a new terminal window in your repo directory, run:
    ```
    truffle console
    ```
6. Migrate your Flashloan contract to your instance of Ganache with:
    ```
    migrate --reset
    ```
7. After a few minutes, your contract will be deployed.
    - If you have not added any profitable logic to `Flashloan.sol` line 23, then you will need to fund your contract with the desired asset.
    - See our [documentation](https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances#reserves-assets) for token address and faucets.
8. Your contract is now deployed on your local Ganache, which is mirroring mainnet. Call your contract's flashloan function within the truffle console, replacing `RESERVE_ADDRESS` with the [reserve address](https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances#reserves-assets) found in our documentation:
    ```
    let f = await Flashloan.deployed()
    await f.flashloan(RESERVE_ADDRESS)
    ```
    Be patient as your ganache instance works its magic.

9. If your implementation is correct, then the transaction will succeed. If it fails/reverts, a reason will be given.

## Known issues
### No access to archive state errors
If you are using Ganache to fork a network, then you may have issues with the blockchain archive state every 30 minutes. This is due to your node provider (i.e. Infura) only allowing free users access to 30 minutes of archive state. To solve this, upgrade to a paid plan, or simply restart your ganache instance and redploy your contracts.

### Unable to debug executeOperation() with mainnet ganache fork
The Truffle debugger does not work too well with proxy / complex calls. You may find that the Truffle debugger returns an error such as:
```
TypeError: Cannot read property 'version' of undefined
at ...
```
- In this case you can try calling your `executeOperation()` function directly, instead of having Aave's `LendingPool` contract invoke the function. This will allow you to debug the function directly, however you will need to supply the relevant parameters (e.g. `_amount`, `_fee`, `_reserve`, etc).
- Alternatively, see the 'Troubleshooting' link.


## Troubleshooting
See our [Troubleshooting Errors](https://docs.aave.com/developers/tutorials/troubleshooting-errors) documentation.

# Resources
 - Our [flash loan documentation](https://docs.aave.com/developers/tutorials/performing-a-flash-loan)
 - Our [Developer Discord channel](https://discord.gg/CJm5Jt3)
