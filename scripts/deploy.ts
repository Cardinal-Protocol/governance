import { writeFileSync } from "fs";
import { Contract, ContractFactory } from "ethers";
import { ethers, run, network } from "hardhat";

require("dotenv").config();

const path = require('path');


const filePath: string = path.join(__dirname, '..', 'deployed.txt');
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


async function main()
{
	const YieldSyncGovernance: ContractFactory = await ethers.getContractFactory('YieldSyncGovernance');

	const [DEPLOYER] = await ethers.getSigners();

	writeFileSync(filePath, `Attempted Deployment Timestamp: ${Date.now()}\n`, { flag: "a" });

	const notice_network: string = `Network: ${network.name}\n`;

	writeFileSync(filePath, notice_network, { flag: "a" });
	console.log(notice_network);

	const notice_account: string = `Account: ${DEPLOYER.address}\n`;

	writeFileSync(filePath, notice_account, { flag: "a" });
	console.log(notice_account);

	const notice_balance: string = `Balance: ${await DEPLOYER.getBalance()}\n`;

	writeFileSync(filePath, notice_balance, { flag: "a" });
	console.log(notice_balance);


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


main().then(() => {
	process.exit(0);
}).catch((error) => {
	console.error(error);
	process.exit(1);
});
