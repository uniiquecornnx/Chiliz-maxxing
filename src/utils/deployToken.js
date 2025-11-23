import { deployPublishedContract } from "thirdweb/deploys";
import { client } from "./wallet";

// Streamer wallet address for deployment
const STREAMER_WALLET_ADDRESS = "0x0b198e6492adEe3573A53D72B1baA0D3Ed9a27E4";

/**
 * Deploy a fan token using Thirdweb API
 * Uses the streamer wallet address for deployment
 * 
 * @param {Object} wallet - Connected wallet instance (for signing)
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

    // Get account and chain from wallet
    const account = await wallet.getAccount();
    const chain = await wallet.getChain();

    console.log("Deploying fan token:", { tokenName, tokenSymbol, initialSupply });
    console.log("Account:", account);
    console.log("Chain:", chain);
    console.log("Streamer wallet:", STREAMER_WALLET_ADDRESS);

    // Verify account and address
    if (!account) {
      throw new Error("Invalid wallet account. Please reconnect your wallet.");
    }

    const deployerAddress = STREAMER_WALLET_ADDRESS; // Use streamer wallet
    if (!deployerAddress || !deployerAddress.startsWith("0x")) {
      throw new Error("Invalid deployer address.");
    }

    // Get client ID from environment
    const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
    if (!clientId) {
      throw new Error("VITE_THIRDWEB_CLIENT_ID is not set");
    }

    console.log("Deploying via Thirdweb SDK...");
    console.log("Chain ID:", chain?.id);
    console.log("Chain Name:", chain?.name);

    // Deploy using Thirdweb SDK
    // Try different contract IDs and parameter structures
    let contractAddress;
    let lastError;

    // Try 1: TokenERC20 with full parameters
    try {
      console.log("Attempting TokenERC20 deployment...");
      contractAddress = await deployPublishedContract({
        client,
        chain,
        account,
        contractId: "TokenERC20",
        constructorParams: {
          defaultAdmin: deployerAddress,
          name: tokenName,
          symbol: tokenSymbol,
          primarySaleRecipient: deployerAddress,
          platformFeeBps: 0,
          platformFeeRecipient: "0x0000000000000000000000000000000000000000",
        },
      });
      console.log("✅ TokenERC20 deployment successful!");
    } catch (error1) {
      console.log("TokenERC20 failed:", error1.message);
      lastError = error1;
      
      // Try 2: TokenERC20 with account address as admin
      try {
        console.log("Attempting TokenERC20 with account address...");
        contractAddress = await deployPublishedContract({
          client,
          chain,
          account,
          contractId: "TokenERC20",
          constructorParams: {
            defaultAdmin: account.address,
            name: tokenName,
            symbol: tokenSymbol,
            primarySaleRecipient: account.address,
            platformFeeBps: 0,
            platformFeeRecipient: "0x0000000000000000000000000000000000000000",
          },
        });
        console.log("✅ TokenERC20 deployment successful (with account address)!");
      } catch (error2) {
        console.log("TokenERC20 with account address failed:", error2.message);
        lastError = error2;
        
        // Try 3: Simple Token contract
        try {
          console.log("Attempting simple Token contract...");
          contractAddress = await deployPublishedContract({
            client,
            chain,
            account,
            contractId: "Token",
            constructorParams: {
              name: tokenName,
              symbol: tokenSymbol,
            },
          });
          console.log("✅ Token deployment successful!");
        } catch (error3) {
          console.log("Token contract failed:", error3.message);
          lastError = error3;
          throw new Error(`All deployment attempts failed. Last error: ${lastError.message}`);
        }
      }
    }

    if (!contractAddress) {
      throw new Error("Deployment failed: No contract address returned");
    }

    console.log("Token deployed to:", contractAddress);

    return {
      success: true,
      contractAddress: contractAddress,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      initialSupply: initialSupply,
      message: "Fan token deployed successfully!",
    };
  } catch (error) {
    console.error("Error deploying fan token:", error);
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
