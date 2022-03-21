// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Delegate {

  address public owner;

  constructor(address _owner) {
    console.log("within constructor() of Delegate contract", _owner); // why this line is not being prited during instantiation of the contract?
    owner = _owner;
  }

  function pwn() public {
    console.log("within pwn() of Delegate contract");
    owner = msg.sender;
  }
}
