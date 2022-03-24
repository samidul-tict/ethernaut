// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Reentrance {
  
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    //console.log("Reentrance amount: ", msg.value, _to);
    balances[_to] += msg.value;
    //console.log("-- Reentrance balance: ", balances[_to]);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    //console.log("Reentrance balance: ", balances[_who], _who);
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      console.log("sender: ", msg.sender , " amount before call: ", balances[msg.sender]);
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
      console.log("sender: ", msg.sender , " amount: ", _amount);
    }
  }

  receive() external payable {}
}
