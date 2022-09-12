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
    
    modifier atLeastOneCopy(uint _bookId) {
        require(books[_bookId].numberOfCopies > 0);
        _;
    }
    
    modifier ifBorrowed(uint _bookId) {
        require(msg.sender == bookToUser[_bookId], "This book is already taken!");
        _;
    }

    function addBook(string calldata _bookName, uint8 _numberOfCopies) external onlyOwner {
        books.push(Book(_bookName, _numberOfCopies));
        uint id = books.length;
        emit NewBook(id, _bookName, _numberOfCopies);
    }
    
    function getAvailableBooks() external view returns(string[] memory) {
        string[] memory result = new string[](books.length);
        uint counter = 0;
        
        for (uint i = 0; i < books.length; i++) {
            result[counter] = books[counter].name;
            counter++;
        }
        return result;
    }

    function isBorrowedByCaller(uint _bookId) external view onlyOwner returns (bool) {
        return (bookToUser[_bookId] == msg.sender) ? true : false;
    }
    
    function borrowBook(uint _bookId) external atLeastOneCopy(_bookId) {
        bookToUser[_bookId] = msg.sender;
        bookToAddresses[_bookId].push(msg.sender);
        books[_bookId].numberOfCopies--;
    }
    
    function returnBook(uint _bookId) external ifBorrowed(_bookId) {
        delete(bookToUser[_bookId]);
        books[_bookId].numberOfCopies++;
    }

    function getBookAvailability(uint _bookId) external view onlyOwner returns(uint8) {
        return books[_bookId].numberOfCopies;
    }
    
    function viewAllPeopleBorrowedABook(uint _bookId) public view returns(address[] memory) {
        return bookToAddresses[_bookId];
    }
    
}