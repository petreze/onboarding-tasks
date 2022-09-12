const hre = require("hardhat");
const USElection = require('../artifacts/contracts/USElection.sol/USElection.json')


const run = async function() {
	const provider = new hre.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")
	const latestBlock = await provider.getBlock("latest")
	console.log(latestBlock.hash)


	//init 'Wallet' instance providing
	//the private key of the deployer (taken from the local node) and
	//the 'Provider' instance which is initialized with the local node url
	const wallet = new hre.ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", provider);
	const balance = await wallet.getBalance();
	console.log(hre.ethers.utils.formatEther(balance, 18));

	const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
	const electionContract = new hre.ethers.Contract(contractAddress, USElection.abi, wallet)
	console.log(electionContract)


	//query contract's method
	const hasEnded = await electionContract.electionEnded()
	console.log("The election has ended:", hasEnded)

	const haveResultsForOhio = await electionContract.resultsSubmitted("Ohio")
	console.log("Have results for Ohio:", haveResultsForOhio)


	// submit transaction
	const transactionOhio = await electionContract.submitStateResult(["Ohio", 250, 150, 24]);
	const transactionReceipt = await transactionOhio.wait();
	if (transactionReceipt.status != 1) { // 1 means success
		console.log("Transaction was not successful")
		return 
	}

	const resultsSubmittedOhioNew = await electionContract.resultsSubmitted("Ohio")
	console.log("Results submitted for Ohio", resultsSubmittedOhioNew)

	const currentLeader = await electionContract.currentLeader()
	console.log("Current leader", currentLeader)
}


run()