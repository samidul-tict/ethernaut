import { expect } from "chai";
import { ethers } from "hardhat";
import { Vault } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Delegation", function () {

    let vault: Vault;
    let owner: SignerWithAddress;
    let sami: SignerWithAddress;
    let vaultStatus: boolean;
    const passwd = "HelloEthernaut";

    this.beforeAll(async function() {
        
        [owner, sami] = await ethers.getSigners();
        const Vault = await ethers.getContractFactory("Vault");
        vault = (await Vault.connect(owner).deploy(ethers.utils.formatBytes32String(passwd))) as Vault;
        console.log("initial password: ", ethers.utils.formatBytes32String(passwd));
        await vault.deployed();
        console.log("contract address: ", vault.address);
        vaultStatus = await vault.getVaultStatus();
        console.log("get vault status: ", vaultStatus);
    });

    it("unlock vault", async function () {
        
        const potentialPasswd = await ethers.provider.getStorageAt(vault.address, 1);
        console.log("potential password: ", potentialPasswd);
        await vault.unlock(potentialPasswd);
    });

    it("get Vault Status again", async function () {
        
        vaultStatus = await vault.getVaultStatus();
        console.log("get vault status: ", vaultStatus);
    });
});
