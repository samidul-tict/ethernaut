// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Vault {
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) {
    locked = true;
    password = _password;
    console.log("Vault initialized");
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }

  // added to validate the status
  function getVaultStatus() external view returns(bool) {
    return locked;
  }
  
}
