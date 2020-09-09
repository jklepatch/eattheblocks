const { ethers } = require("ethers");
const erc20 = require("@studydefi/money-legos/erc20");
const kyber = require("@studydefi/money-legos/kyber");

const provider = new ethers.providers.JsonRpcProvider(
  process.env.PROVIDER_URL || "http://localhost:8545",
);

const wallet = new ethers.Wallet(
  "0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773", // Default private key for ganache-cli -d
  provider,
);

const swapOnKyber = async (fromAddress, toAddress, fromAmountWei) => {
  // Don't swap
  if (fromAddress === toAddress) {
    return fromAmountWei;
  }

  const gasLimit = 4000000;

  // Min conversion rate
  const minConversionRate = 1;

  const kyberNetwork = new ethers.Contract(
    kyber.network.address,
    kyber.network.abi,
    wallet,
  );

  // ERC20 contract
  const fromTokenContract = new ethers.Contract(fromAddress, erc20.abi, wallet);

  // ETH -> Token
  if (fromAddress === erc20.eth.address) {
    return kyberNetwork.swapEtherToToken(toAddress, minConversionRate, {
      gasLimit,
      value: fromAmountWei,
    });
  }

  // Need to approve transferFrom
  await fromTokenContract.approve(kyberNetwork.address, fromAmountWei);

  // Token -> ETH
  if (toAddress === erc20.eth.address) {
    return kyberNetwork.swapTokenToEther(
      fromAddress,
      fromAmountWei,
      minConversionRate,
      {
        gasLimit,
      },
    );
  }

  // Token -> Token
  return kyberNetwork.swapTokenToToken(
    fromAddress,
    fromAmountWei,
    toAddress,
    minConversionRate,
    {
      gasLimit,
    },
  );
};

const swapAndLog = async (fromToken, toToken, amount) => {
  console.log(`Swapping ${amount} ${fromToken.symbol} to ${toToken.symbol}`);

  await swapOnKyber(
    fromToken.address,
    toToken.address,
    ethers.utils.parseUnits(amount.toString(), fromToken.decimals),
  );

  if (toToken === erc20.eth) {
    const ethBalWei = await wallet.getBalance();
    console.log(
      `${toToken.symbol} balance: ${ethers.utils.formatEther(ethBalWei)}`,
    );
    return;
  }

  const repBal = await newTokenContract(toToken.address).balanceOf(
    wallet.address,
  );
  console.log(
    `New ${toToken.symbol} balance: ${ethers.utils.formatUnits(
      repBal,
      toToken.decimals,
    )}`,
  );
};

const main = async () => {
  await swapAndLog(erc20.eth, erc20.dai, 1);
  await swapAndLog(erc20.dai, erc20.rep, 50);
  await swapAndLog(erc20.rep, erc20.eth, 2);
};

main();
