import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { Fallback } from "../typechain/";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Fallback", function () {

    let fb: Fallback;
    let owner: SignerWithAddress;
    let bob: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeEach(async function() {
        [owner, bob, sami] = await ethers.getSigners();
        const Fallback = await ethers.getContractFactory("Fallback");
        fb = (await Fallback.connect(owner).deploy()) as Fallback;
        await fb.deployed();
    });

    it("contribute and validate", async function () {
        
        await fb.connect(owner).contribute({value:ethers.utils.parseEther("0.0001")});
        await fb.connect(bob).contribute({value:ethers.utils.parseEther("0.0001")});
        await fb.connect(sami).contribute({value:ethers.utils.parseEther("0.0001")});
        
        let ownerContribution = await fb.connect(owner).getContribution();
        let bobContribution = await fb.connect(bob).getContribution();
        let samiContribution = await fb.connect(sami).getContribution();

        console.log("contribution: %u %u %u", ownerContribution, bobContribution, samiContribution);
    });

    it("try to withdraw", async function () {
        
        await fb.connect(owner).withdraw();
        try {
            expect (await fb.connect(sami).withdraw()).to.be.revertedWith("caller is not the owner");
        } catch {
            console.log("sami is not the owner", sami.address);
        }
    });

    it("manupulate the owner", async function () {
        
        //await fb.connect(sami).receive{value:ethers.utils.parseEther("0.1")}("");
        await fb.connect(owner).withdraw();
        try {
            expect (await fb.connect(sami).withdraw()).to.be.revertedWith("caller is not the owner");
        } catch {
            console.log("sami is not the owner", sami.address);
        }
    });

});
