// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Test {
    
    function test(uint _i) external pure returns (uint) {
        return _i;
    }

    function getData(uint _i) external pure returns (bytes memory) {
        return abi.encodeWithSelector(this.test.selector, _i);
    }
}
