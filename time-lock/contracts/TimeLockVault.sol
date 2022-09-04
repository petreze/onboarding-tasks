// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
 

// the contract represents a vault where, after depositing some funds, the user can withdraw them after a specific period
contract TimeLockVault {
    
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;
    
    function deposit() external payable {

        balances[msg.sender] +=msg.value;
        lockTime[msg.sender] = block.timestamp + 1 days;
    }

    function increaseLockTime(uint _secondsToIncrease) external {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() external {

        require(balances[msg.sender] > 0, "not enough funds");
        require(block.timestamp > lockTime[msg.sender], "lock time still in progress");
      
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "sending funds failed");
    }
}