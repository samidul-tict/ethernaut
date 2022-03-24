import { expect } from "chai";
import { ethers } from "hardhat";
import { Fallout } from "../typechain/";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";

describe("Fallout", function () {

    let fallout: Fallout;
    let res: BigNumber;
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        [owner, alice, bob, sami] = await ethers.getSigners();
        const Fallout = await ethers.getContractFactory("Fallout");
        fallout = (await Fallout.connect(owner).deploy()) as Fallout;
        await fallout.deployed();
        console.log("contract address: ", fallout.address);
    });

    it("constructor", async function () {
        
        await fallout.connect(owner).Fal1out({value:ethers.utils.parseEther("1.0")});
    });

    it("allocate", async function () {
        
        await fallout.connect(alice).allocate({value:ethers.utils.parseEther("1.0")});
        await fallout.connect(bob).allocate({value:ethers.utils.parseEther("1.0")});
        await fallout.connect(sami).allocate({value:ethers.utils.parseEther("1.0")});
    });

    it("allocator balance", async function () {
        
        res = await fallout.allocatorBalance(owner.address);
        console.log("owner's balance: ", res);

        res = await fallout.allocatorBalance(alice.address);
        console.log("alice's balance: ", res);

        res = await fallout.allocatorBalance(bob.address);
        console.log("bob's balance: ", res);

        res = await fallout.allocatorBalance(sami.address);
        console.log("sami's balance: ", res);
    });

    it("send allocation", async function () {
        
        await fallout.sendAllocation(owner.address);
        await fallout.sendAllocation(alice.address);
        await fallout.sendAllocation(bob.address);
    });

    it("collect allocations", async function () {
        
        await fallout.connect(owner).collectAllocations();
        try {
            expect (await fallout.connect(sami).Fal1out({value:ethers.utils.parseEther("1.0")})).to.be.revertedWith("caller is not the owner");
        } catch {
            console.log("sami is not the owner", sami.address);
        }
        
        await fallout.connect(sami).Fal1out({value:ethers.utils.parseEther("1.0")});
        await fallout.connect(sami).collectAllocations();
    });

    it("allocator balance", async function () {
        
        res = await fallout.allocatorBalance(owner.address);
        console.log("owner's balance: ", res);

        res = await fallout.allocatorBalance(alice.address);
        console.log("alice's balance: ", res);

        res = await fallout.allocatorBalance(bob.address);
        console.log("bob's balance: ", res);

        res = await fallout.allocatorBalance(sami.address);
        console.log("sami's balance: ", res);
    });

});
