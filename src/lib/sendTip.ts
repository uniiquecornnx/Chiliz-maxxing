import { wrapFetchWithPayment } from "thirdweb/x402";
import { client } from "../utils/wallet";

/**
 * Send a tip using x402 payment protocol
 * @param {Object} wallet - Connected wallet instance
 * @param {string} message - Optional message to include with the tip
 * @param {string} tipAmount - Amount to tip in CHZ (default: "0.01")
 * @returns {Promise<Object>} - Result of the tip transaction
 */
export async function sendTip(
  wallet: any,
  message: string = "",
  tipAmount: string = "0.01"
) {
  try {
    if (!wallet) {
      throw new Error("Wallet not connected. Please connect your wallet first.");
    }

    const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
    if (!clientId) {
      throw new Error("VITE_THIRDWEB_CLIENT_ID is not set");
    }

    // Create payment-enabled fetch
    const fetchWithPay = wrapFetchWithPayment(fetch, client, wallet);

    // Make the tip request with x402 payment
    // The API endpoint should be your backend server URL
    // For local dev: "http://localhost:3001/api/tip"
    // For production: "https://your-api-domain.com/api/tip"
    const apiUrl = import.meta.env.VITE_X402_API_URL || "http://localhost:3001/api/tip";
    
    const response = await fetchWithPay(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        amount: tipAmount,
      }),
    }).catch(() => {
      // If API endpoint doesn't exist, fall back to direct contract call
      return null;
    });

    if (response && response.ok) {
      const result = await response.json();
      return result;
    }

    // Fallback: Use direct contract call
    throw new Error("API endpoint not available. Use sendDirectTip instead.");
  } catch (error: any) {
    console.error("Error sending tip:", error);
    throw error;
  }
}

/**
 * Send a direct on-chain tip to the contract
 * This method sends CHZ directly to the TipJar contract
 * @param {Object} wallet - Connected wallet instance
 * @param {string} contractAddress - The TipJar contract address
 * @param {string} message - Optional message to include with the tip
 * @param {string} tipAmount - Amount to tip in CHZ (default: "0.01")
 * @returns {Promise<Object>} - Transaction receipt
 */
export async function sendDirectTip(
  wallet: any,
  contractAddress: string,
  message: string = "",
  tipAmount: string = "0.01"
) {
  try {
    if (!wallet) {
      throw new Error("Wallet not connected. Please connect your wallet first.");
    }

    if (!contractAddress) {
      throw new Error("Contract address is required");
    }

    // Import contract utilities
    const { prepareContractCall, sendTransaction } = await import("thirdweb");
    const { getContract } = await import("thirdweb/contract");
    const { client } = await import("../utils/wallet");

    // Get the account and chain from wallet
    const account = await wallet.getAccount();
    const chain = await wallet.getChain();

    // Get the contract
    const contract = getContract({
      client,
      chain: chain,
      address: contractAddress,
    });

    // Convert tip amount to wei (CHZ has 18 decimals)
    const amountInWei = BigInt(Math.floor(parseFloat(tipAmount) * 10 ** 18));

    // Prepare the tip transaction
    const tipCall = prepareContractCall({
      contract,
      method: "function tip(string calldata message) external payable",
      params: [message],
      value: amountInWei,
    });

    // Send the transaction
    const transaction = await sendTransaction({
      transaction: tipCall,
      account: account,
    });

    return {
      success: true,
      transactionHash: transaction.transactionHash,
      message: "Tip sent successfully!",
    };
  } catch (error: any) {
    console.error("Error sending direct tip:", error);
    throw error;
  }
}

/**
 * Send a tip to CreatorTip contract
 * This method sends CHZ directly to the CreatorTip contract
 * @param {Object} wallet - Connected wallet instance
 * @param {string} contractAddress - The CreatorTip contract address
 * @param {string} message - Optional message to include with the tip
 * @param {string} tipAmount - Amount to tip in CHZ (e.g., "0.1")
 * @returns {Promise<Object>} - Transaction receipt
 */
export async function sendCreatorTip(
  wallet: any,
  contractAddress: string,
  message: string = "",
  tipAmount: string = "0.01"
) {
  try {
    if (!wallet) {
      throw new Error("Wallet not connected. Please connect your wallet first.");
    }

    if (!contractAddress) {
      throw new Error("Contract address is required");
    }

    // Validate tip amount
    const amount = parseFloat(tipAmount);
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Tip amount must be greater than 0");
    }

    // Import contract utilities
    const { prepareContractCall, sendTransaction } = await import("thirdweb");
    const { getContract } = await import("thirdweb/contract");
    const { client } = await import("../utils/wallet");

    // Get the account and chain from wallet
    const account = await wallet.getAccount();
    const chain = await wallet.getChain();

    // Get the contract
    const contract = getContract({
      client,
      chain: chain,
      address: contractAddress,
    });

    // Convert tip amount to wei (CHZ has 18 decimals)
    const amountInWei = BigInt(Math.floor(amount * 10 ** 18));

    // Prepare the tip transaction for CreatorTip contract
    // Function signature: tip(string calldata message) external payable
    const tipCall = prepareContractCall({
      contract,
      method: "function tip(string calldata message) external payable",
      params: [message || ""],
      value: amountInWei,
    });

    // Send the transaction
    const transaction = await sendTransaction({
      transaction: tipCall,
      account: account,
    });

    return {
      success: true,
      transactionHash: transaction.transactionHash,
      message: "Tip sent successfully!",
      amount: tipAmount,
    };
  } catch (error: any) {
    console.error("Error sending creator tip:", error);
    throw error;
  }
}

