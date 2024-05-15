// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


import { AccessControlEnumerable } from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

import { IYieldSyncGovernance } from "./interface/IYieldSyncGovernance.sol";


contract YieldSyncGovernance is
	AccessControlEnumerable,
	IYieldSyncGovernance
{
	/// @inheritdoc IYieldSyncGovernance
	address public override payTo;


	constructor ()
	{
		_setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
	}

	/// @inheritdoc IYieldSyncGovernance
	function payToUpdate(address _payTo)
		public
		override
		onlyRole(DEFAULT_ADMIN_ROLE)
	{
		require(_payTo != address(0), "!(_payTo != address(0))");

		payTo = _payTo;
	}
}

/*
* ██╗   ██╗██╗███████╗██╗     ██████╗     ███████╗██╗   ██╗███╗   ██╗ ██████╗
* ╚██╗ ██╔╝██║██╔════╝██║     ██╔══██╗    ██╔════╝╚██╗ ██╔╝████╗  ██║██╔════╝
*  ╚████╔╝ ██║█████╗  ██║     ██║  ██║    ███████╗ ╚████╔╝ ██╔██╗ ██║██║
*   ╚██╔╝  ██║██╔══╝  ██║     ██║  ██║    ╚════██║  ╚██╔╝  ██║╚██╗██║██║
*    ██║   ██║███████╗███████╗██████╔╝    ███████║   ██║   ██║ ╚████║╚██████╗
*    ╚═╝   ╚═╝╚══════╝╚══════╝╚═════╝     ╚══════╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝
*/
