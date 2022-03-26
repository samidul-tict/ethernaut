import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { CalculateGuess } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Fallback", function () {

    let cg: CalculateGuess;
    let owner: SignerWithAddress;

    this.beforeAll(async function() {
        [owner] = await ethers.getSigners();
        const CalculateGuess = await ethers.getContractFactory("CalculateGuess");
        cg = (await CalculateGuess.connect(owner).deploy()) as CalculateGuess;
        await cg.deployed();
        console.log("contract address: ", cg.address);
    });

    it("flip", async function() {
        
        for (let i = 0; i < 100; i++) {
            console.log("--------- ", i , " ---------");
            const val = await cg.connect(owner).calculateGuess();
            console.log("------------------");
        }
    });

});
