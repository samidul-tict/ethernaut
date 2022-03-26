// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Telephone {

  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function changeOwner(address _owner) public {
    
    console.log("2. ", msg.sender, _owner, tx.origin);
    if (tx.origin != msg.sender) {
      owner = _owner;
      console.log("within if");
    }
  }
}