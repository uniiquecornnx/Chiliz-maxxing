require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Local Hardhat network
    hardhat: {
      chainId: 31337
    },
    // Chiliz Spicy Testnet
    chilizSpicy: {
      url: "https://spicy-rpc.chiliz.com",
      chainId: 88882,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: "auto"
    },
    // Chiliz Mainnet
    chiliz: {
      url: "https://rpc.ankr.com/chiliz",
      chainId: 88888,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: "auto"
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};

