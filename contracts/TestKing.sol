// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TestKing {

    address public owner;
    
    constructor() {
        owner = msg.sender;
    }

    function transferToKing(address payable _kingAddress) external payable returns(bool) {
        require(msg.value >= 0);
        (bool sent, bytes memory data) = _kingAddress.call{value: msg.value}("");
        return sent;
    }

}
