import { deployFanTokenDirect } from "./deployTokenDirect";

/**
 * Deploy fan token using direct wallet deployment
 * Uses the connected wallet's gas fees
 * 
 * @param {Object} wallet - Connected wallet instance
 * @param {string} tokenName - Name of the token (e.g., "StreamerFanToken")
 * @param {string} tokenSymbol - Symbol of the token (e.g., "SFT")
 * @param {string} initialSupply - Initial supply (e.g., "1000000" for 1M tokens)
 * @returns {Promise<Object>} - Deployment result with contract address
 */
export async function deployFanToken(
  wallet,
  tokenName,
  tokenSymbol,
  initialSupply = "1000000"
) {
  try {
    if (!wallet) {
      throw new Error("Wallet not connected. Please connect your wallet first.");
    }

    if (!tokenName || !tokenSymbol) {
      throw new Error("Token name and symbol are required");
    }

    console.log("🚀 Deploying fan token:", { tokenName, tokenSymbol, initialSupply });

    // Use direct deployment (faster, no backend needed)
    const result = await deployFanTokenDirect(
      wallet,
      tokenName,
      tokenSymbol,
      initialSupply
    );

    console.log("✅ Token deployed successfully:", result);

    return {
      success: true,
      contractAddress: result.contractAddress,
      tokenName: result.tokenName,
      tokenSymbol: result.tokenSymbol,
      initialSupply: result.totalSupply,
      message: "Fan token deployed successfully!",
      explorerUrl: result.explorerUrl
    };
  } catch (error) {
    console.error("❌ Error deploying fan token:", error);
    throw error;
  }
}

/**
 * Alternative: Deploy using custom contract bytecode
 * Use this if you have a custom token contract
 */
export async function deployCustomToken(
  wallet,
  tokenName,
  tokenSymbol,
  initialSupply = "1000000"
) {
  try {
    if (!wallet) {
      throw new Error("Wallet not connected");
    }

    // Import contract utilities
    const { deployContract } = await import("thirdweb/deploys");
    const { getContract } = await import("thirdweb/contract");
    const account = await wallet.getAccount();
    const chain = await wallet.getChain();

    // For custom deployment, you would need:
    // 1. Compiled bytecode
    // 2. ABI
    // 3. Constructor parameters
    
    // This is a placeholder - you'd need to compile your contract first
    throw new Error("Custom token deployment requires compiled bytecode. Use deployFanToken instead.");
  } catch (error) {
    console.error("Error deploying custom token:", error);
    throw error;
  }
}
