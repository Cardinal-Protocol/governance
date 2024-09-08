require("dotenv").config();

import { Contract, ContractFactory } from "ethers";
import { ethers, run, network } from "hardhat";


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


async function main()
{
	const [deployer] = await ethers.getSigners();

	console.log("Deploying on Network:", network.name);
	console.log("Deployer Account:", deployer.address);
	console.log("Account Balance:", await deployer.getBalance());

	const YieldSyncGovernance: ContractFactory = await ethers.getContractFactory('YieldSyncGovernance');

	const yieldSyncGovernance: Contract = await (await YieldSyncGovernance.deploy()).deployed();

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
