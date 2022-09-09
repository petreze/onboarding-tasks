import { hre } from "hardhat";

const run = async function() {
	console.log("Hello world")
	console.log(hre.ethers.version)
}

run()