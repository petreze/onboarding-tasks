// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Test {
    
    string public message;
    address public caller;

    function setParams(string calldata _message) public {
        message = _message;
        caller = msg.sender;
    }
}