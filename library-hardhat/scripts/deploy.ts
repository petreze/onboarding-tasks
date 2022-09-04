import { ethers } from "hardhat";

async function deployLibraryContract() {
  await hre.run('compile'); // We are compiling the contracts using subtask
  const [deployer] = await ethers.getSigners(); // We are getting the deployer

  console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
  console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

  const Library = await ethers.getContractFactory("Library"); // 
  const libraryContract = await Library.deploy();
  console.log('Waiting for Library deployment...');
  await libraryContract.deployed();

  /* setTimeout(async () => {
    await hre.run("verify:verify", {
      address: libraryContract.address
    });
  }, 20000); */

  await hre.run('print', { address: libraryContract.address });
}

module.exports = deployLibraryContract;