import { writeFileSync } from "fs";
import { Contract, ContractFactory } from "ethers";
import { ethers, run, network } from "hardhat";


require("dotenv").config();

const path = require('path');

const filePath = path.join(__dirname, '..', 'deployed.txt');
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


async function main()
{
	const [DEPLOYER] = await ethers.getSigners();

	writeFileSync(filePath, `Attempted Deployment Timestamp: ${Date.now()}\n`, { flag: "a" });

	const notice: string = `Network: ${network.name}\nAccount: ${DEPLOYER.address}\nBalance: ${await DEPLOYER.getBalance()}\n`;

	writeFileSync(filePath, notice, { flag: "a" });

	console.log(notice);

	const YieldSyncGovernance: ContractFactory = await ethers.getContractFactory('YieldSyncGovernance');

	const yieldSyncGovernance: Contract = await (await YieldSyncGovernance.deploy()).deployed();

	writeFileSync(filePath, `yieldSyncGovernance: ${yieldSyncGovernance.address}\n`, { flag: "a" });

	console.log(`yieldSyncGovernance address: ${yieldSyncGovernance.address}`);

	console.log("Waiting 2 minutes before verifying..");

	// Delay
	await delay(120000);

	await run(
		"verify:verify",
		{
			contract: "contracts/YieldSyncGovernance.sol:YieldSyncGovernance",
			address: yieldSyncGovernance.address,
			constructorArguments: [],
		}
	);

	const notice_balance_after: string = `Account Balance After: ${await DEPLOYER.getBalance()}\n`;

	writeFileSync(filePath, notice_balance_after, { flag: "a" });

	writeFileSync(
		filePath,
		`================================================================================\n\n`,
		{ flag: "a" }
	);

	console.log(notice_balance_after);

}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
;
