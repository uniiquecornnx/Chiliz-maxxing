/**
 * Express Server for x402 Payments
 * 
 * This server handles x402 payment endpoints for tipping.
 * 
 * Setup:
 * 1. npm install express cors thirdweb
 * 2. Create .env file with:
 *    - THIRDWEB_SECRET_KEY
 *    - SERVER_WALLET_ADDRESS
 *    - NETWORK (optional, "testnet" or "mainnet")
 * 3. Run: node server/index.js
 */

import express from "express";
import cors from "cors";
import { handleTipRequest } from "./api/tip.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// x402 Tip endpoint
app.post("/api/tip", handleTipRequest);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 x402 Payment Server running on port ${PORT}`);
  console.log(`📍 Tip endpoint: http://localhost:${PORT}/api/tip`);
  console.log(`🌐 Network: ${process.env.NETWORK || "testnet"}`);
});

