import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { sendCreatorTip } from "../lib/sendTip";

const LiveStream = ({ roomID, userID, wallet, tokenAddress, tokenName, tokenSymbol, isHost }) => {
  const containerRef = useRef(null);

  const appID = Number(import.meta.env.VITE_ZEGOCLOUD_APP_ID);
  const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;

  useEffect(() => {
    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userID
    );

    if (token && ZegoUIKitPrebuilt) {
      const zp = ZegoUIKitPrebuilt.create(token);
      zp.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role: ZegoUIKitPrebuilt.Host,
          },
        },
        sharedLinks: [
          {
            name: "Copy Link",
            url: `${window.location.origin}?roomID=${roomID}`,
          },
        ],
      });
    }
  }, [roomID, userID]);

  const [isTipping, setIsTipping] = useState(false);
  const [tipMessage, setTipMessage] = useState("");
  const [tipAmount, setTipAmount] = useState("0.01");

  // Get CreatorTip contract address from environment
  // You can set this in .env as VITE_CREATOR_TIP_CONTRACT_ADDRESS
  const contractAddress = import.meta.env.VITE_CREATOR_TIP_CONTRACT_ADDRESS || "";

  const handleTipStreamer = async () => {
    if (!wallet) {
      alert("Please connect your wallet first to send a tip!");
      return;
    }

    if (!contractAddress) {
      alert("CreatorTip contract address not configured. Please set VITE_CREATOR_TIP_CONTRACT_ADDRESS in your .env file.");
      return;
    }

    // Validate tip amount
    const amount = parseFloat(tipAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid tip amount greater than 0");
      return;
    }

    setIsTipping(true);
    try {
      const result = await sendCreatorTip(
        wallet,
        contractAddress,
        tipMessage || "",
        tipAmount
      );

      if (result.success) {
        alert(`Tip of ${tipAmount} CHZ sent successfully!\nTransaction: ${result.transactionHash}`);
        setTipMessage(""); // Clear message after successful tip
        setTipAmount("0.01"); // Reset to default
      }
    } catch (error) {
      console.error("Error sending tip:", error);
      alert(`Failed to send tip: ${error.message || "Unknown error"}`);
    } finally {
      setIsTipping(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Streaming Video and Messaging Section */}
      <div
        ref={containerRef}
        className="w-full flex-1 zego_container"
      />
      
      {/* Tip Streamer Button Section */}
      <div className="w-full flex flex-col justify-center items-center p-4 bg-gray-900/50 border-t border-gray-700 gap-3">
        <div className="w-full max-w-md space-y-3">
          {/* Amount Input */}
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-medium min-w-[80px]">Amount (CHZ):</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.01"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500"
              disabled={isTipping}
            />
          </div>

          {/* Message Input */}
          <div className="flex items-center gap-2">
            <label className="text-white text-sm font-medium min-w-[80px]">Message:</label>
            <input
              type="text"
              placeholder="Optional message..."
              value={tipMessage}
              onChange={(e) => setTipMessage(e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-lg focus:outline-none focus:border-purple-500"
              disabled={isTipping}
            />
          </div>

          {/* Tip Button */}
          <button
            onClick={handleTipStreamer}
            disabled={isTipping || !wallet || !contractAddress}
            className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {isTipping ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Tip...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clipRule="evenodd"
                  />
                </svg>
                Send {tipAmount} CHZ Tip
              </>
            )}
          </button>

          {/* Status Messages */}
          {!wallet && (
            <p className="text-xs text-yellow-400 text-center">
              Connect your wallet to send tips
            </p>
          )}
          {!contractAddress && wallet && (
            <p className="text-xs text-red-400 text-center">
              CreatorTip contract address not configured. Set VITE_CREATOR_TIP_CONTRACT_ADDRESS in .env
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveStream;
