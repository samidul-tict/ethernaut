// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Force {
    
    address payable public owner;
    
    constructor() {
        owner = payable(msg.sender);
    }
}