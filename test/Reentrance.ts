import { expect } from "chai";
import { ethers } from "hardhat";
import { Reentrance } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Delegation", function () {

    let reentrance: Reentrance;
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        
        [owner, alice, bob] = await ethers.getSigners();
        const Reentrance = await ethers.getContractFactory("Reentrance");
        reentrance = (await Reentrance.connect(owner).deploy()) as Reentrance;
        await reentrance.deployed();
        console.log("contract address: ", reentrance.address);
    });

    it("donate", async function () {
        
        await reentrance.donate({value:ethers.utils.parseEther("1.0")}, alice.address);
        await reentrance.donate({value:ethers.utils.parseEther("1.0")}, bob.address);
        await reentrance.donate({value:ethers.utils.parseEther("1.0")}, sami.address);
    });

    it("balance Of", async function () {
        
        const bal1 = await reentrance.balanceOf(alice.address);
        const bal2 = await reentrance.balanceOf(bob.address);
        const bal3 = await reentrance.balanceOf(sami.address);
        console.log("--- ", bal1, bal2, bal3)
    });

    it("withdraw", async function () {
        
        const [returnFlag, returnFlag1, returnFlag2] = await Promise.all([
            reentrance.connect(sami).withdraw({value:ethers.utils.parseEther("0.7")}), 
            reentrance.connect(sami).withdraw({value:ethers.utils.parseEther("0.4")}), 
            reentrance.connect(sami).withdraw({value:ethers.utils.parseEther("0.3")})
        ]);
        console.log("transfer status: ", returnFlag, returnFlag1, returnFlag2);
    });

    it("balance Of", async function () {
        
        const bal1 = await reentrance.balanceOf(alice.address);
        const bal2 = await reentrance.balanceOf(bob.address);
        const bal3 = await reentrance.balanceOf(sami.address);
        console.log("--- ", bal1, bal2, bal3)
    });

});
