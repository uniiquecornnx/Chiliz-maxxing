// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TipJar {
    event TipReceived(address indexed from, uint256 amount, string message);

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit TipReceived(msg.sender, msg.value, "");
    }

    function tip(string calldata message) external payable {
        require(msg.value > 0, "No tip sent");
        emit TipReceived(msg.sender, msg.value, message);
    }

    function withdraw(address payable to) external {
        require(msg.sender == owner, "Not authorized");
        to.transfer(address(this).balance);
    }
}

