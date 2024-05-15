// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


import { IAccessControlEnumerable } from "@openzeppelin/contracts/access/IAccessControlEnumerable.sol";


interface IYieldSyncGovernance is
	IAccessControlEnumerable
{
	/**
	* @notice Pay To
	*/
	function payTo()
		external
		view
		returns (address)
	;


	/**
	* @notice Pay To Update
	* @param _payTo {address}
	*/
	function payToUpdate(address _payTo)
		external
	;
}
