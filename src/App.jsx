import React, { useState, useEffect } from "react";
import JoinForm from "./components/JoinForm";
import LiveStream from "./components/LiveStream";
import { connectWallet, disconnectWallet, getWalletAddress, getWalletChain } from "./utils/wallet";

function App() {
  const [joined, setJoined] = useState(false);
  const [roomData, setRoomData] = useState({});
  const [wallet, setWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletChain, setWalletChain] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Update wallet address and chain when wallet changes
  useEffect(() => {
    const updateWalletInfo = async () => {
      if (wallet) {
        const address = await getWalletAddress(wallet);
        const chain = await getWalletChain(wallet);
        setWalletAddress(address);
        setWalletChain(chain);
      } else {
        setWalletAddress(null);
        setWalletChain(null);
      }
    };
    
    updateWalletInfo();
  }, [wallet]);

  const handleJoin = ({ roomID, userID }) => {
    setRoomData({ roomID, userID });
    setJoined(true);
  };

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const connectedWallet = await connectWallet("io.metamask");
      setWallet(connectedWallet);
      console.log("Wallet connected:", connectedWallet);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet(wallet);
      setWallet(null);
      setWalletAddress(null);
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Wallet Connection Header */}
      <div className="w-full flex justify-end p-4 fixed top-0 right-0 z-50">
        {walletAddress ? (
          <div className="flex items-center gap-4">
            <div className="text-white text-sm flex flex-col items-end">
              <div className="font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
              {walletChain && (
                <div className="text-xs text-gray-400">
                  Chain: {walletChain.name || walletChain.id || "Unknown"}
                </div>
              )}
            </div>
            <button
              onClick={handleDisconnectWallet}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="w-full min-h-screen flex items-center justify-center pt-20">
        {joined ? (
          <LiveStream roomID={roomData.roomID} userID={roomData.userID} />
        ) : (
          <JoinForm onJoin={handleJoin} />
        )}
      </div>
    </div>
  );
}

export default App;
