const { expect } = require("chai");
import { ethers } from "hardhat";
import { USElection } from "../typechain-types";

/* const hre = require('hardhat')
const ethers = hre.ethers; */


describe("USElection", function () {   
    let usElectionFactory;
    let usElection: USElection;
    before(async () => {
        usElectionFactory = await ethers.getContractFactory("USElection");
        usElection = await usElectionFactory.deploy();
        await usElection.deployed();
    });
    it.only("Should return the current leader before submit any election results", async function () {
        await hre.run('print', { message: "test subtask" })
        expect(await usElection.currentLeader()).to.equal(0); // NOBODY
    });

    it("Should return the election status", async function () {
        expect(await usElection.electionEnded()).to.equal(false); // Not Ended
    });

    it("Should submit state results and get current leader", async function () {
        const stateResults = ["California",1000,900,32];
        const submitStateResultsTx = await usElection.submitStateResult(stateResults);
        await submitStateResultsTx.wait();
        expect(await usElection.currentLeader()).to.equal(1); // BIDEN
    });

    it("Should throw when try to submit already submitted state results", async function () {
        const stateResults = ["California",1000,900,32];
        expect(usElection.submitStateResult(stateResults)).to.be.revertedWith('This state result was already submitted!');
    });

    it("Should submit state results and get current leader", async function () {
        const stateResults = ["Ohaio",800,1200,33];
        const submitStateResultsTx = await usElection.submitStateResult(stateResults);
        await submitStateResultsTx.wait();
        expect(await usElection.currentLeader()).to.equal(2); // TRUMP
    });

    it("Should end the elections, get the leader and election status", async function () {
        const endElectionTx = await usElection.endElection();
        await endElectionTx.wait();
        expect(await usElection.currentLeader()).to.equal(2); // TRUMP
        expect(await usElection.electionEnded()).to.equal(true); // Ended
    });

    it("Should throw on trying to end election with not the owner", async function () {
        const [owner, addr1] = await ethers.getSigners();
        expect(usElection.connect(owner).endElection()).to.be.revertedWith('Not invoked by the owner');
        expect(await usElection.electionEnded()).to.equal(true); // Not Ended
    });
});