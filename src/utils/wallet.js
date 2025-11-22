import { createThirdwebClient } from "thirdweb";
import { createWallet, injectedProvider } from "thirdweb/wallets";

// Get client ID from environment
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

if (!clientId) {
  console.warn("VITE_THIRDWEB_CLIENT_ID is not set. Wallet connection may not work.");
}

// Create Thirdweb client
export const client = createThirdwebClient({ clientId });

/**
 * Check if a specific wallet is installed
 * @param {string} walletId - The wallet ID (e.g., "io.metamask")
 * @returns {boolean} - True if wallet is installed
 */
export const isWalletInstalled = (walletId) => {
  return !!injectedProvider(walletId);
};

/**
 * Connect to a specific wallet
 * @param {string} walletId - The wallet ID (e.g., "io.metamask", "io.metamask", "com.coinbase.wallet")
 * @returns {Promise<Object>} - Connected wallet instance
 */
export const connectWallet = async (walletId = "io.metamask") => {
  try {
    // Check if wallet is installed
    const provider = injectedProvider(walletId);
    
    if (provider) {
      console.log(`${walletId} is installed`);
    } else {
      console.log(`${walletId} is not installed, will use WalletConnect modal`);
    }

    // Create wallet instance
    const wallet = createWallet(walletId);
    
    // Connect to the wallet
    await wallet.connect({ client });
    
    return wallet;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    throw error;
  }
};

/**
 * Disconnect wallet
 * @param {Object} wallet - The wallet instance to disconnect
 */
export const disconnectWallet = async (wallet) => {
  try {
    if (wallet) {
      await wallet.disconnect();
    }
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
    throw error;
  }
};

/**
 * Get wallet address
 * @param {Object} wallet - The wallet instance
 * @returns {Promise<string|null>} - Wallet address or null
 */
export const getWalletAddress = async (wallet) => {
  try {
    if (!wallet) return null;
    
    const account = await wallet.getAccount();
    return account?.address || null;
  } catch (error) {
    console.error("Error getting wallet address:", error);
    return null;
  }
};

/**
 * Get the current chain the wallet is connected to
 * @param {Object} wallet - The wallet instance
 * @returns {Promise<Object|null>} - Chain information or null
 */
export const getWalletChain = async (wallet) => {
  try {
    if (!wallet) return null;
    
    const account = await wallet.getAccount();
    return account?.chain || null;
  } catch (error) {
    console.error("Error getting wallet chain:", error);
    return null;
  }
};

