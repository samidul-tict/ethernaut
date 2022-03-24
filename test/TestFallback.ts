import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { TestFallback } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Test Fallback", function () {

    let tfb: TestFallback;
    let owner: SignerWithAddress;
    let bob: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        [owner, bob, sami] = await ethers.getSigners();
        const TestFallback = await ethers.getContractFactory("TestFallback");
        tfb = (await TestFallback.connect(owner).deploy()) as TestFallback;
        // how to get address of Fallback.sol
        await tfb.deployed();
    });

    it("contribute and validate", async function() {
        
        await tfb.connect(owner).contribute({value:ethers.utils.parseEther("0.0001")});
        await tfb.connect(bob).contribute({value:ethers.utils.parseEther("0.0001")});
        await tfb.connect(sami).contribute({value:ethers.utils.parseEther("0.0001")});
        
        let ownerContribution = await tfb.connect(owner).getContribution();
        let bobContribution = await tfb.connect(bob).getContribution();
        let samiContribution = await tfb.connect(sami).getContribution();

        console.log("contribution: ", ownerContribution, bobContribution, samiContribution);
    });

    it("try to withdraw", async function() {
        
        await tfb.connect(owner).withdraw();
        try {
            expect (await tfb.connect(sami).withdraw()).to.be.revertedWith("caller is not the owner");
        } catch {
            console.log("sami is not the owner", sami.address);
        }

        // tfb.connect(sami).withdraw().wait()
    });

    it("manupulate the owner", async function() {
        
        // how to call receive() from here?
        //await tfb.connect(sami).tryReceive(tfb.address); // {value:ethers.utils.parseEther("0.1")}
        await tfb.connect(sami).withdraw();
        try {
            expect (await tfb.connect(owner).withdraw()).to.be.revertedWith("caller is not the owner");
        } catch {
            console.log("now owner is not the actual owner", owner.address);
        }
    });

});
