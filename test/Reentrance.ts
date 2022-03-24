import { expect } from "chai";
import { ethers } from "hardhat";
import { MaliciousContract } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Delegation", function () {

    let reentrance: MaliciousContract;
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;

    this.beforeAll(async function() {
        
        [owner, alice] = await ethers.getSigners();
        const MaliciousContract = await ethers.getContractFactory("MaliciousContract");
        reentrance = (await MaliciousContract.connect(owner).deploy()) as MaliciousContract;
        await reentrance.deployed();
        console.log("contract address: ", reentrance.address);
    });

    it("donate", async function () {
        
        await reentrance.donate(reentrance.address, {value:ethers.utils.parseEther("3.0").toString()});
        await reentrance.donate(reentrance.address, {value:ethers.utils.parseEther("2.0").toString()});
        await reentrance.donate(alice.address, {value:ethers.utils.parseEther("3.0").toString()});
        await reentrance.donate(alice.address, {value:ethers.utils.parseEther("2.0").toString()});
    });

    it("get balance", async function () {
        
        const bal = await reentrance.getBalance(reentrance.address);
        const bal1 = await reentrance.getBalance(alice.address);
        const bal2 = await reentrance.balanceOfCurrent();
        console.log("Malicious Contract balance: ", bal, ", alice balance: ", bal1, ", Malicious Contract balance before attack: ", bal2);
    });

    it("withdraw", async function () {
        
        await reentrance.connect(owner).withdraw();
    });

    //it("withdraw", async function () {
        
    //    const [returnFlag, returnFlag1, returnFlag2] = await Promise.all([
    //        reentrance.connect(sami).withdraw({value:ethers.utils.parseEther("0.7").toString()}), 
    //        reentrance.connect(sami).withdraw({value:ethers.utils.parseEther("0.4").toString()}), 
    //        reentrance.connect(sami).withdraw({value:ethers.utils.parseEther("0.3").toString()})
    //    ]);
    //    console.log("transfer status: ", returnFlag, returnFlag1, returnFlag2);
    //});

    it("get balance", async function () {
        
        const bal = await reentrance.getBalance(reentrance.address);
        const bal1 = await reentrance.getBalance(alice.address);
        const bal2 = await reentrance.balanceOfCurrent();
        console.log("Malicious Contract balance: ", bal, ", alice balance: ", bal1, ", Malicious Contract balance after attack: ", bal2);
    });

});
