import { expect } from "chai";
import { ethers } from "hardhat";
import { Force } from "../typechain";
import { Denial } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Force", function () {

    let force: Force;
    let denial: Denial;
    let owner: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        
        [owner, sami] = await ethers.getSigners();
        const Force = await ethers.getContractFactory("Force");
        force = (await Force.connect(owner).deploy()) as Force;
        await force.deployed();
        console.log("force contract address: ", force.address);

        const Denial = await ethers.getContractFactory("Denial");
        denial = (await Denial.connect(owner).deploy()) as Denial;
        await denial.deployed();
        console.log("denial contract address: ", denial.address);
    });

    it("deposit fund to owner", async function () {
        
        const tx = {
            to: denial.address,
            value: ethers.utils.parseEther("1.0")
        };
        await owner.sendTransaction(tx);
    });

    it("check balance of owner", async function () {
        
        const bal = await denial.connect(owner).contractBalance();
        console.log("contract balance: ", bal);
    });

    it("set partner", async function () {
        
        await denial.connect(owner).setWithdrawPartner(force.address);
    });

    it("withdraw by partner", async function () {
        
        await denial.connect(owner).withdraw();
    });

    it("check balance of owner again", async function () {
        
        const bal = await denial.connect(owner).contractBalance();
        console.log("contract balance: ", bal);
    });

});
