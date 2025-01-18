import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";


describe("[0] YieldSyncGovernance.sol - YieldSync Governance", async () => {
	let yieldSyncGovernance: Contract;

	before("[before] Set up contracts..", async () => {
		const YieldSyncGovernance: ContractFactory = await ethers.getContractFactory("YieldSyncGovernance");

		yieldSyncGovernance = await (await YieldSyncGovernance.deploy()).deployed();
	});

	describe("Initial values", async () => {
		it(
			"Should set msg.sender as an admin",
			async () => {
				const [owner] = await ethers.getSigners();

				expect(await yieldSyncGovernance.hasRole(ethers.constants.HashZero, owner.address)).to.be.true;
			}
		);
	});


	describe("Restriction: IYieldSyncGovernance DEFAULT_ADMIN_ROLE", async () => {
		describe("grantRole()", async () => {
			it(
				"Should revert when unauthorized msg.sender calls..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					await expect(
						yieldSyncGovernance.connect(addr1).grantRole(
							ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
							addr1.address
						)
					).to.be.rejected;
				}
			);

			it(
				"Should be able to add address to a newly created role..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					await yieldSyncGovernance.grantRole(
						ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
						addr1.address
					);

					expect(await yieldSyncGovernance.hasRole(
						ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
						addr1.address
					)).to.be.true;
				}
			);
		});

		describe("revokeRole()", async () => {
			it(
				"Should revert when unauthorized msg.sender calls..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					await expect(
						yieldSyncGovernance.connect(addr1).revokeRole(
							ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
							addr1.address
						)
					).to.be.rejected;
				}
			);

			it(
				"Should be able to remove address from a role..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					await yieldSyncGovernance.revokeRole(
						ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
						addr1.address
					);

					expect(await yieldSyncGovernance.hasRole(
						ethers.utils.solidityKeccak256(["string"], ["JARL_OF_WHITERUN"]),
						addr1.address
					)).to.be.false;
				}
			);
		});

		describe("renounceRole()", async () => {
			it(
				"Should revert when unauthorized msg.sender calls..",
				async () => {
					const [owner, addr1] = await ethers.getSigners();

					await expect(
						yieldSyncGovernance.connect(addr1).renounceRole(ethers.constants.HashZero, owner.address)
					).to.be.rejected;
				}
			);
			it(
				"Should be able to be called by role member..",
				async () => {
					const [, addr1] = await ethers.getSigners();

					await yieldSyncGovernance.grantRole(ethers.constants.HashZero, addr1.address)

					await yieldSyncGovernance.connect(addr1).renounceRole(ethers.constants.HashZero, addr1.address);

					expect(await yieldSyncGovernance.hasRole(ethers.constants.HashZero, addr1.address)).to.be.false;
				}
			);
		});
	});


	describe("function payToUpdate()", async () => {
		it(
			"[auth] Should revert when unauthorized msg.sender calls..",
			async () => {
				const [, ADDR_1] = await ethers.getSigners();

				await expect(yieldSyncGovernance.connect(ADDR_1).payToUpdate(ADDR_1.address)).to.be.rejected;
			}
		);

		it(
			"Should allow payTo to be changed..",
			async () => {
				const [, ADDR_1] = await ethers.getSigners();

				await expect(yieldSyncGovernance.payToUpdate(ADDR_1.address)).to.be.not.reverted;

				expect(await yieldSyncGovernance.payTo()).to.be.equal(ADDR_1.address);
			}
		);
	});
});
