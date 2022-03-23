import { expect } from "chai";
import { ethers } from "hardhat";
import { King } from "../typechain";
import { TestKing } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { boolean } from "hardhat/internal/core/params/argumentTypes";

describe("Delegation", function () {

    let king: King;
    let testKing: TestKing;
    let owner: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        
        [owner, sami] = await ethers.getSigners();
        const King = await ethers.getContractFactory("King");
        king = (await King.connect(owner).deploy({value:ethers.utils.parseEther("1.0")})) as King;
        await king.deployed();
        console.log("king address: ", king.address);

        const TestKing = await ethers.getContractFactory("TestKing");
        testKing = (await TestKing.connect(sami).deploy()) as TestKing;
        await testKing.deployed();
        console.log("Testking address: ", testKing.address);
    });

    it("get king's address", async function () {
        
        const res = await king._king();
        console.log("1. king's address: ", res);
    });

    it("transfer to king contract", async function () {
        
        const returnFlag = await testKing.transferToKing(king.address);
        console.log("transfer status: ", returnFlag);
    });

    it("get king's address", async function () {
        
        const res = await king._king();
        console.log("2. king's address: ", res);
    });

});
