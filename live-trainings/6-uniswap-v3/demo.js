// npm init -y
// npm i ethers
// npm i @uniswap/v3-sdk
// npm i @uniswap/sdk-core
// npm i @uniswap/v3-core
// npm i @uniswap/v3-periphery 

// create a pool instance 
const { ethers } = require("ethers");
const { Pool, TickListDataProvider, Tick, Route, Trade, priceToClosestTick, Position } = require("@uniswap/v3-sdk");
const { Token, CurrencyAmount, Percent, Price } = require("@uniswap/sdk-core");

const UniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const UniswapV3Router = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json");
const UniswapPositionManager = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json");

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/019ac6d6fe9746c89b97355eba686917");
const signer = new ethers.Wallet.createRandom();
const account = signer.connect(provider);

const poolAddress = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";
const poolContract = new ethers.Contract(poolAddress, UniswapV3Pool.abi, provider);

const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
const routerContract = new ethers.Contract(routerAddress, UniswapV3Router.abi, provider);
const uniswapRouter = routerContract.connect(account);

const positionManagerAddress = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
const positionManagerContract = new ethers.Contract(positionManagerAddress, UniswapPositionManager.abi, provider);
const uniswapPositionManager = positionManagerContract.connect(account);

async function main() {

    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

    const token0 = new Token(1, usdcAddress, 6, "USDC", "USD Coin");
    const token1 = new Token(1, wethAddress, 18, "WETH", "Wrapped Ether");

    const poolFee = await poolContract.fee();
    const slot0 = await poolContract.slot0();
    const poolLiquidity = await poolContract.liquidity();
    const tickSpacing = await poolContract.tickSpacing();

    const nearestTick = Math.floor(slot0[1] / tickSpacing) * tickSpacing;

    const tickLowerIndex = nearestTick - (60 * 100);
    const tickUpperIndex = nearestTick + (60 * 100);

    const tickLowerData = await poolContract.ticks(tickLowerIndex);
    const tickUpperData = await poolContract.ticks(tickUpperIndex);

    const tickLower = new Tick({
        index: tickLowerIndex,
        liquidityGross: tickLowerData.liquidityGross,
        liquidityNet: tickLowerData.liquidityNet
    });

    const tickUpper = new Tick({
        index: tickUpperIndex,
        liquidityGross: tickUpperData.liquidityGross,
        liquidityNet: tickUpperData.liquidityNet
    });

    const tickList = new TickListDataProvider([tickLower, tickUpper], tickSpacing)

    const pool = new Pool(
        token0,
        token1, 
        poolFee,
        slot0[0],
        poolLiquidity,
        slot0[1],
        tickList
    );

    // Swap 5000 USDC for WETH

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const amountIn = CurrencyAmount.fromRawAmount(token0, "5000000000");

    const route = new Route([pool], token0, token1);
    console.log(`1 USDC can be swapped for ${route.midPrice.toSignificant(6)} WETH`);
    console.log(`1 WETH can be swapped for ${route.midPrice.invert().toSignificant(6)} USDC`);

    const trade = await Trade.exactIn(route, amountIn);
    console.log(`The execution price of this trade is ${trade.executionPrice.toSignificant(6)} WETH for 1 USDC.`)

    const slippageTolerance = new Percent('50', '10000') // => 0.05% => 1 bip = 0.001

    const amountOutMinimum = trade.minimumAmountOut(slippageTolerance);
    console.log(`For 5000 USDC you can get a minimum of ${amountOutMinimum.toSignificant(6)} WETH`);

    // const swapParams = {
    //     path: Buffer.from([usdcAddress, wethAddress]),
    //     recipient: signer.address,
    //     deadline: deadline,
    //     amountIn: ethers.utils.parseUnits(amountIn.toExact(), 6),
    //     amountOutMinimum: ethers.utils.parseUnits(amountOutMinimum.toExact(), 18)
    // }

    // const swapTx = uniswapRouter.exactInput(
    //     swapParams,
    //     { value: value, gasPrice: 20e9 }
    // );
    // console.log(`Swap Transaction hash: ${swapTx.hash}`);
    // const swapReceipt = await swapTx.wait();
    // console.log(`Swap Transaction receipt: ${swapReceipt}`);

    // Add liquidity of 5 ETH within the 1500-3000 USDC/WETH price range
    const lowerPrice = CurrencyAmount.fromRawAmount(token0, "1500000000");
    const upperPrice = CurrencyAmount.fromRawAmount(token0, "3000000000");

    const lowerPriceTick = priceToClosestTick(new Price(token1, token0, lowerPrice.numerator, lowerPrice.denominator));
    const upperPriceTick = priceToClosestTick(new Price(token1, token0, upperPrice.numerator, upperPrice.denominator));

    const lowerTickSpacing = Math.floor(lowerPriceTick / tickSpacing) * tickSpacing;
    const upperTickSpacing = Math.floor(upperPriceTick / tickSpacing) * tickSpacing;
    console.log(`To provide liquidity for the 1500-3000 USDC/WETH range, you need to create a position between ${lowerTickSpacing} and ${upperTickSpacing} ticks.`);

    const position = new Position({
        pool: pool,
        liquidity: ethers.utils.parseEther("5.0"),
        tickLower: lowerTickSpacing,
        tickUpper: upperTickSpacing
    });

    const mintAmounts = position.mintAmounts;

    const mintParams = {
        token0: usdcAddress,
        token1: wethAddress,
        fee: pool.fee,
        tickLower: lowerTickSpacing,
        tickUpper: upperTickSpacing,
        amuont0Desired: mintAmounts.amount0.toString(),
        amount1Desired: mintAmounts.amount1.toString(),
        amount0Min: mintAmounts.amount0.toString(),
        amount1Min: mintAmounts.amount1.toString(),
        recipient: signer.address,
        deadline: deadline
    }

    const mintTx = await uniswapPositionManager.mint(
        mintParams,
        { value: value, gasPrice: 20e9 }
    );
}

main();