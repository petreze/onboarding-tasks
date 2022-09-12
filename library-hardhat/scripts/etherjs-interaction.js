const hre = require("hardhat");
const Library = require('../artifacts/contracts/Library.sol/Library.json')


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
	const libraryContract = new hre.ethers.Contract(contractAddress, Library.abi, wallet)
	console.log(libraryContract)

	//adding some books
	const addFirstBookTx = await libraryContract.addBook("First Book", 13);
	const firstReceipt = await addFirstBookTx.wait();
	if (firstReceipt.status != 1) {
		console.log("Adding first book was unsuccessful!");
	}
	
	const addSecondBookTx = await libraryContract.addBook("Second Book", 10);
	const secondReceipt = await addSecondBookTx.wait();
	if (secondReceipt.status != 1) {
		console.log("Adding second book was unsuccessful!");
	}
	
	const addThirdBookTx = await libraryContract.addBook("Third Book", 7);
	const thirdReceipt = await addThirdBookTx.wait();
	if (thirdReceipt.status != 1) {
		console.log("Adding third book was unsuccessful!");
	}
	
	const addFourthBookTx = await libraryContract.addBook("Fourth Book", 8);
	const fourthReceipt = await addFourthBookTx.wait();
	if (fourthReceipt.status != 1) {
		console.log("Adding fourth book was unsuccessful!");
	}

	/* const availableBooks = await libraryContract.getAvailableBooks();
	console.log(availableBooks); */
	
	const availableBook = await libraryContract.getBookAvailability(0);
	console.log(`availability before everything: ${availableBook}`);
	
	const borrowBookTx = await libraryContract.borrowBook(0);
	const borrowReceipt = await borrowBookTx.wait();
	if (borrowReceipt.status != 1) {
		console.log("Borrowing failed!");
	}

	//check if the caller has borrowed a book with id 0
	//comparing his address to the zero address
	const ifBorrowed = await libraryContract.isBorrowedByCaller(0)
	console.log(`ifBorrowed: ${ifBorrowed}`);

	const availableBookAfterBorrow = await libraryContract.getBookAvailability(0);
	console.log(`availability after borrow: ${availableBookAfterBorrow}`);

	const returnBookTx = await libraryContract.returnBook(0);
	const returnReceipt = await returnBookTx.wait();
	if (returnReceipt.status != 1) {
		console.log("Borrowing failed!");
	}

	const availableBookAfterReturn = await libraryContract.getBookAvailability(0);
	console.log(`availability after return: ${availableBookAfterReturn}`);
}

run()