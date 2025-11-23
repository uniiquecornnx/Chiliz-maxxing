// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CreatorTip {
    address public creator;
    
    event TipReceived(address indexed tipper, uint256 amount, string message);
    event CreatorUpdated(address indexed oldCreator, address indexed newCreator);
    event Withdrawn(address indexed creator, uint256 amount);

    modifier onlyCreator() {
        require(msg.sender == creator, "Only creator can call this");
        _;
    }

    constructor(address _creator) {
        require(_creator != address(0), "Invalid creator address");
        creator = _creator;
    }

    /// @notice Send a tip to the creator
    /// @param message Optional message to include with the tip
    function tip(string calldata message) external payable {
        require(msg.value > 0, "Tip must be greater than 0");
        emit TipReceived(msg.sender, msg.value, message);
    }

    /// @notice Withdraw all tips to the creator's address
    function withdraw() external onlyCreator {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(creator).call{value: balance}("");
        require(success, "Withdrawal failed");
        
        emit Withdrawn(creator, balance);
    }

    /// @notice Update the creator address
    /// @param newCreator The new creator address
    function updateCreator(address newCreator) external onlyCreator {
        require(newCreator != address(0), "Invalid address");
        address oldCreator = creator;
        creator = newCreator;
        emit CreatorUpdated(oldCreator, newCreator);
    }

    /// @notice Get the contract's current balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /// @notice Allow direct CHZ transfers
    receive() external payable {
        emit TipReceived(msg.sender, msg.value, "");
    }
}

