import { expect } from "chai";
import { ethers } from "hardhat";
import { Delegation } from "../typechain/";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Delegation", function () {

    let delegation: Delegation;
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        [owner, alice, bob, sami] = await ethers.getSigners();
        const Delegation = await ethers.getContractFactory("Delegation");
        delegation = (await Delegation.connect(owner).deploy(alice.address)) as Delegation;
        await delegation.deployed();
        console.log("contract address: ", delegation.address);
    });

    it("constructor", async function () {
        
        // how to trigger the fallback()??
        //await delegation.connect(owner).Fal1out({value:ethers.utils.parseEther("1.0")});
    });

});
