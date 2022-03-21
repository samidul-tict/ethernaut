// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Delegate.sol";
import "hardhat/console.sol";

contract Delegation {

  address public owner; // msg.sender
  Delegate delegate;

  constructor(address _delegateAddress) {
    delegate = Delegate(_delegateAddress); // custom address
    owner = msg.sender;
  }

  fallback() external { // execute when msg.data is not empty and receive is not defined
    console.log("within fallcak() of Delegation contract");
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
  }
}
