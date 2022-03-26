// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./CoinFlip.sol";

contract CalculateGuess is CoinFlip {

    constructor() CoinFlip() {
        consecutiveWins = 0;
    }

    function calculateGuess() public returns (bool _guessMatched) {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        console.log("Calculate Guess: block value: ", blockValue);

        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        console.log("Calculate Guess: side: ", side);
        
        _guessMatched = flip(side);
        return _guessMatched;
    }
}