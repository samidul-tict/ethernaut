import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { Telephone } from "../typechain";
import { ChangeTelephoneOwner } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Telephone", function () {

    let tel: Telephone;
    let chgTel: ChangeTelephoneOwner;
    let owner: SignerWithAddress;
    let sami: SignerWithAddress;

    this.beforeAll(async function() {
        [owner, sami] = await ethers.getSigners();
        const Telephone = await ethers.getContractFactory("Telephone");
        tel = (await Telephone.connect(owner).deploy()) as Telephone;
        await tel.deployed();
        console.log("Telephone contract address: ", tel.address);

        const ChangeTelephoneOwner = await ethers.getContractFactory("ChangeTelephoneOwner");
        chgTel = (await ChangeTelephoneOwner.connect(owner).deploy()) as ChangeTelephoneOwner;
        await chgTel.deployed();
        console.log("ChangeTelephoneOwner contract address: ", chgTel.address);
    });

    it("flip", async function() {
        
        await chgTel.connect(sami).callChangeOwner(tel.address);
    });

});
