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

	// Factory
	const YieldSyncGovernance: ContractFactory = await ethers.getContractFactory('YieldSyncGovernance');

	// Deploy Contract
	const yieldSyncGovernance: Contract = await (await YieldSyncGovernance.deploy()).deployed();

	console.log("Waiting 30 seconds before verifying..");

	// Delay
	await delay(30000);

	// yieldSyncV1ATransferRequestProtocol
	await run(
		"verify:verify",
		{
			contract: "contracts/YieldSyncGovernance.sol:YieldSyncGovernance",
			address: yieldSyncGovernance.address,
			constructorArguments: [],
		}
	);

	console.log(`yieldSyncGovernance address: ${yieldSyncGovernance.address}`);
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
