import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { Token } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Token", function () {

    let token: Token;
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        [owner, alice, sami] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        token = (await Token.connect(owner).deploy(500)) as Token;
        await token.deployed();
        console.log("Telephone contract address: ", token.address);
    });

    it("transfer to sami", async function() {
        
        await token.connect(owner).transfer(sami.address, 20);
    });

    it("balance before hack", async function() {
        
        const sami_balance = await token.balanceOf(sami.address);
        const alice_balance = await token.balanceOf(alice.address);
        const owner_balance = await token.balanceOf(owner.address);
        console.log(sami_balance, " --- ", owner_balance, " --- ", alice_balance);
    });

    it("manipulate transfer", async function() {
        
        await token.connect(sami).transfer(alice.address, 20);
    });

    it("balance after hack", async function() {
        
        const sami_balance = await token.balanceOf(sami.address);
        const alice_balance = await token.balanceOf(alice.address);
        const owner_balance = await token.balanceOf(owner.address);
        console.log(sami_balance, " --- ", owner_balance, " --- ", alice_balance);
    });

});
