import { defineChain } from "thirdweb/chains";
import { defineThirdwebConfig } from "thirdweb";

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "";

export default defineThirdwebConfig({
  clientId: clientId,
  chains: [
    defineChain({
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
    }),
    // Also include mainnet for production
    defineChain({
      id: 88888,
      name: "Chiliz Chain",
      rpc: "https://rpc.ankr.com/chiliz",
      nativeCurrency: {
        name: "CHZ",
        symbol: "CHZ",
        decimals: 18,
      },
      blockExplorers: [
        { name: "ChilizScan", url: "https://chiliscan.com" },
      ],
    }),
  ],
});

