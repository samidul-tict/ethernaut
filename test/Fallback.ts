import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { Fallback } from "../typechain/";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Fallback", function () {

    let fb: Fallback;
    let owner: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        [owner, sami] = await ethers.getSigners();
        const Fallback = await ethers.getContractFactory("Fallback");
        fb = (await Fallback.connect(owner).deploy()) as Fallback;
        await fb.deployed();
        console.log("contract address: ", fb.address);
    });

    it("contribute", async function() {
        
        await fb.connect(sami).contribute({value:ethers.utils.parseEther("0.0001")});
        let samiContribution = await fb.connect(sami).getContribution();

        console.log("sami's contribution: ", samiContribution);
    });

    it("transfer and change the owner", async function () {
        const tx = {
            to: fb.address,
            value: ethers.utils.parseEther("1.0")
          }
          
        await sami.sendTransaction(tx);
    });

    it("try to withdraw by different user", async function () {
        
        await fb.connect(sami).withdraw();
    });

});
