// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma abicoder v2;

//import "./Ownable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Library is Ownable {
    
    event NewBook(uint bookId, string bookName, uint8 numberOfCopies);
    
    mapping (uint => address) bookToUser;
    mapping (uint => address[]) bookToAddresses;
    
    struct Book {
        string name;
        uint8 numberOfCopies;
    }
    
    Book[] public books;
    
    function addBook(string calldata _bookName, uint8 _numberOfCopies) internal onlyOwner {
        books.push(Book(_bookName, _numberOfCopies));
        uint id = books.length;
        emit NewBook(id, _bookName, _numberOfCopies);
    }
    
    function getAvailableBooks() external view returns(uint[] memory) {
        uint[] memory result = new uint[](books.length);
        uint counter = 0;
        
        for (uint i = 0; i < books.length; i++) {
            result[counter] = i;
            counter++;
        }
        return result;
    }
    
    modifier atLeastOneCopy(uint _bookId) {
        require(books[_bookId].numberOfCopies > 0);
        _;
    }
    
    modifier onlyBorrower(uint _bookId) {
        require(msg.sender == bookToUser[_bookId]);
        _;
    }
    
    function borrowBook(uint _bookId) external atLeastOneCopy(_bookId) {
        bookToUser[_bookId] = msg.sender;
        bookToAddresses[_bookId].push(msg.sender);
        books[_bookId].numberOfCopies--;
    }
    
    function returnBook(uint _bookId) external onlyBorrower(_bookId) {
        //TODO remove the book from the mapping
        books[_bookId].numberOfCopies++;
    }
    
    function viewAllPeopleBorrowedABook(uint _bookId) public view returns(address[] memory) {
        return bookToAddresses[_bookId];
    }
    
}