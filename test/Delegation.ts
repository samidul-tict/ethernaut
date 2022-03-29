import { expect } from "chai";
import { ethers } from "hardhat";
import { Delegate } from "../typechain/";
import { Delegation } from "../typechain/";
import { CallDelegation } from "../typechain/";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Delegation", function () {

    let callDelegation: CallDelegation;
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

        const CallDelegation = await ethers.getContractFactory("CallDelegation");
        callDelegation = (await CallDelegation.connect(owner).deploy(delegation.address)) as CallDelegation;
        await callDelegation.deployed();
        console.log("call delegation contract address: ", callDelegation.address);
    });

    xit("transfer and change the owner", async function () {
        
        // let ABI = [function pwn(){}];
        // let iface = new ethers.utils.Interface(ABI);
        // iface.encodeFunctionData(functionName, [param);

        //const abiCoder = ethers.utils.defaultAbiCoder;
        const tx = {
            to: delegation.address,
            data: ""
            //data: abiCoder.encode("pwn()", [])
        }
          
        await sami.call(tx);
    });

    it("call delegation", async function () {
        
        await callDelegation.connect(sami).callDelegation();
    });

});
