// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Fallback.sol";

contract TestFallback is Fallback {

    constructor() {
        
    }

    // Fallback fb = new Fallback();
    // address(fb);
    function tryReceive(address payable _to) public payable {
        // (bool success,) = address(Fallback).call(abi.encodeWithSignature("receive({value: msg.value})"));
        //(bool success,) = address(fb).call(abi.encodeWithSignature("receive({value: msg.value})"));
        (bool success, ) = _to.call{value: msg.value}("");
        require(success);
        //emit event(address(fb));
    }

}
