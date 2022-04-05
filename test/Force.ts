import { expect } from "chai";
import { ethers } from "hardhat";
import { Force } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Force", function () {

    let force: Force;
    let owner: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        
        [owner, sami] = await ethers.getSigners();
        const Force = await ethers.getContractFactory("Force");
        force = (await Force.connect(owner).deploy()) as Force;
        await force.deployed();
        console.log("contract address: ", force.address);
    });

    it("force deposit", async function () {
        
        const tx = {
            to: force.address,
            value: ethers.utils.parseEther("1.0")
        };
        await force.sendTransaction(tx);
    });

});
