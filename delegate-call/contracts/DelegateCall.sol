// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DelegateCall {
    
    string public message;
    address public caller;

    function setParams(address _contract, string calldata _message) public payable {
        
        (bool success, ) = _contract.delegatecall(
            abi.encodeWithSignature("setParams(string)", _message)
        );

        require(success, "delegate call failed");
    }
}
