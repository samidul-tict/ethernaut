// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import 'hardhat/console.sol';

contract Force {
    
    address payable public owner;
    uint x = 0;
    
    constructor() {
        owner = payable(msg.sender);
    }

    // allow deposit of funds
    receive() external payable {
        console.log("within receive", block.gaslimit);
        for(uint i = 0; i < 500000000000; ++i){
            x += 1;
        }
    }
}