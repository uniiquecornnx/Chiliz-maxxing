// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CustomToken
 * @dev ERC20 Token with customizable name, symbol, and initial supply
 * Mints all tokens to the deployer's address
 */
contract CustomToken is ERC20, Ownable {
    uint8 private _decimals;
    
    /**
     * @dev Constructor to create a custom ERC20 token
     * @param name Token name (e.g., "MyToken")
     * @param symbol Token symbol (e.g., "MTK")
     * @param initialSupply Initial supply in whole tokens (will be converted to wei)
     * @param decimals Number of decimals (default 18)
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _decimals = decimals;
        // Mint initial supply to the deployer
        _mint(msg.sender, initialSupply * 10 ** decimals);
    }

    /**
     * @dev Returns the number of decimals
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Mint new tokens (only owner can mint)
     * @param to Address to receive the tokens
     * @param amount Amount in whole tokens
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10 ** _decimals);
    }

    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount in whole tokens
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount * 10 ** _decimals);
    }
}

