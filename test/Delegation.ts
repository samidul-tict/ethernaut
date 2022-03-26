import { expect } from "chai";
import { ethers } from "hardhat";
import { Delegate } from "../typechain/";
import { Delegation } from "../typechain/";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Delegation", function () {

    let delegation: Delegation;
    let delegate: Delegate;
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        [owner, alice, bob, sami] = await ethers.getSigners();

        const Delegate = await ethers.getContractFactory("Delegate");
        delegate = (await Delegate.connect(owner).deploy(owner.address)) as Delegate;
        await delegate.deployed();
        console.log("delegate contract address: ", delegate.address);

        const Delegation = await ethers.getContractFactory("Delegation");
        delegation = (await Delegation.connect(owner).deploy(delegate.address)) as Delegation;
        await delegation.deployed();
        console.log("delegation contract address: ", delegation.address);
    });

    it("transfer and change the owner", async function () {
        const tx = {
            to: delegation.address,
            value: ethers.utils.parseEther("1.0")
          }
          
        await sami.sendTransaction(tx);
    });

});
