import { createThirdwebClient } from "thirdweb";
import { facilitator, settlePayment } from "thirdweb/x402";
import { defineChain } from "thirdweb/chains";

// Define Chiliz Spicy Testnet
const chilizSpicyTestnet = defineChain({
  id: 88882,
  name: "Chiliz Spicy Testnet",
  rpc: "https://spicy-rpc.chiliz.com",
  nativeCurrency: {
    name: "CHZ",
    symbol: "CHZ",
    decimals: 18,
  },
  blockExplorers: [
    { name: "SpicyScan", url: "https://testnet.chiliscan.com" },
  ],
});

// Get environment variables
const secretKey = process.env.THIRDWEB_SECRET_KEY;
const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;

if (!secretKey) {
  throw new Error("THIRDWEB_SECRET_KEY is required");
}

if (!serverWalletAddress) {
  throw new Error("SERVER_WALLET_ADDRESS is required");
}

// Create Thirdweb client
const client = createThirdwebClient({
  secretKey: secretKey,
});

// Create facilitator
const thirdwebX402Facilitator = facilitator({
  client,
  serverWalletAddress: serverWalletAddress,
});

/**
 * Vercel Serverless Function Handler
 * Handles x402 payments for tipping streamers
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get payment data from headers
    const paymentData = req.headers["x-payment"];
    const { message, amount } = req.body || {};

    // Default tip amount
    const tipAmount = amount || "0.01";

    // Get the resource URL (the API endpoint itself)
    const resourceUrl = req.headers.origin 
      ? `${req.headers.origin}/api/tip`
      : `${req.headers.host ? `https://${req.headers.host}` : ""}/api/tip`;

    // Settle the payment using x402
    const result = await settlePayment({
      resourceUrl: resourceUrl,
      method: "POST",
      paymentData: paymentData,
      payTo: serverWalletAddress,
      network: chilizSpicyTestnet,
      price: tipAmount, // Amount in CHZ
      facilitator: thirdwebX402Facilitator,
      routeConfig: {
        description: `Tip to streamer${message ? `: ${message}` : ""}`,
        mimeType: "application/json",
        maxTimeoutSeconds: 300,
      },
    });

    // If payment successful (status 200)
    if (result.status === 200) {
      // Payment successful - process the tip
      // Here you could save to database, notify streamer, etc.
      return res.status(200).json({
        success: true,
        message: "Tip processed successfully!",
        tipMessage: message || "",
        amount: tipAmount,
        transactionHash: result.transactionHash,
      });
    } else {
      // Return 402 Payment Required or other status
      return res.status(result.status).json(result.responseBody);
    }
  } catch (error) {
    console.error("Error processing tip:", error);
    return res.status(500).json({
      error: "Failed to process tip",
      message: error.message,
    });
  }
}
