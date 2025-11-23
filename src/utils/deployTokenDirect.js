import { ethers } from "ethers";

// Import the compiled contract artifact
import CustomTokenArtifact from "../../hardhat-token/artifacts/contracts/CustomToken.sol/CustomToken.json";

/**
 * Deploy fan token directly from user's wallet
 * No backend needed - uses user's wallet for gas
 * 
 * @param {Object} wallet - Connected Thirdweb wallet instance
 * @param {string} tokenName - Name of the token
 * @param {string} tokenSymbol - Symbol of the token
 * @param {string} initialSupply - Initial supply (default 1000000)
 * @returns {Promise<Object>} - Deployment result
 */
export async function deployFanTokenDirect(
  wallet,
  tokenName,
  tokenSymbol,
  initialSupply = "1000000"
) {
  try {
    if (!wallet) {
      throw new Error("Wallet not connected");
    }

    if (!tokenName || !tokenSymbol) {
      throw new Error("Token name and symbol are required");
    }

    console.log("🚀 Deploying token directly from wallet...");
    console.log("Token:", tokenName, tokenSymbol);

    // Get account from Thirdweb wallet
    const account = await wallet.getAccount();
    const chain = await wallet.getChain();
    
    if (!account || !account.address) {
      throw new Error("Could not get wallet address");
    }

    console.log("Deployer:", account.address);
    console.log("Chain:", chain?.id);

    // Create ethers provider from Thirdweb wallet
    // We need to use window.ethereum for ethers.js (v5)
    if (!window.ethereum) {
      throw new Error("No ethereum provider found. Please connect your wallet.");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Verify we have the right address
    const signerAddress = await signer.getAddress();
    console.log("Signer address:", signerAddress);

    // Check balance
    const balance = await provider.getBalance(signerAddress);
    console.log("Balance:", ethers.utils.formatEther(balance), "CHZ");

    if (balance.isZero()) {
      throw new Error("Insufficient balance. You need CHZ for gas fees.");
    }

    // Create contract factory
    const factory = new ethers.ContractFactory(
      CustomTokenArtifact.abi,
      CustomTokenArtifact.bytecode,
      signer
    );

    console.log("📝 Deploying contract...");

    // Deploy the contract
    const contract = await factory.deploy(
      tokenName,
      tokenSymbol,
      parseInt(initialSupply),
      18 // decimals
    );

    console.log("⏳ Waiting for deployment transaction...");

    // Wait for deployment (v5 syntax)
    await contract.deployed();
    
    const contractAddress = contract.address;
    console.log("✅ Token deployed:", contractAddress);

    // Get token details
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const decimals = await contract.decimals();
    
    // Convert decimals to number (handle both BigNumber and number)
    const decimalsNum = typeof decimals === 'number' ? decimals : (decimals.toNumber ? decimals.toNumber() : Number(decimals));

    return {
      success: true,
      contractAddress,
      tokenName: name,
      tokenSymbol: symbol,
      totalSupply: ethers.utils.formatUnits(totalSupply, decimalsNum),
      decimals: decimalsNum,
      explorerUrl: `https://testnet.chiliscan.com/address/${contractAddress}`,
      message: "Token deployed successfully!"
    };

  } catch (error) {
    console.error("❌ Deployment error:", error);
    throw error;
  }
}

