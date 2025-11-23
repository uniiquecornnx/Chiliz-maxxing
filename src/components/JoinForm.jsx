import React, { useState } from "react";

const JoinForm = ({ onJoin, wallet, isDeployingToken, tokenDeploymentStatus }) => {
  const [roomID, setRoomID] = useState("");
  const [userID, setUserID] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [isHost, setIsHost] = useState(false);

  const handleJoin = () => {
    if (!roomID || !userID) {
      alert("Please enter Room ID and User ID");
      return;
    }

    // If host, require token name and symbol
    if (isHost && (!tokenName || !tokenSymbol)) {
      alert("Please enter Token Name and Symbol to deploy fan token");
      return;
    }

    onJoin({ 
      roomID, 
      userID,
      tokenName: isHost ? tokenName : null,
      tokenSymbol: isHost ? tokenSymbol : null,
      isHost: isHost
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-6 w-full max-w-sm p-8 rounded-xl shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
        <h2 className="text-center text-3xl font-semibold text-white">
          JOIN THE ROOM
        </h2>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          className="bg-white/10 text-white placeholder-white/50 border border-white/20 px-4 py-2 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          placeholder="Enter Your User ID"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          className="bg-white/10 text-white placeholder-white/50 border border-white/20 px-4 py-2 rounded-lg focus:outline-none"
        />
        
        {/* Host/Streamer Options */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isHost"
            checked={isHost}
            onChange={(e) => setIsHost(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="isHost" className="text-white text-sm">
            I'm a streamer/host (deploy fan token)
          </label>
        </div>

        {isHost && wallet && (
          <div className="flex flex-col gap-3 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <p className="text-xs text-purple-300">Fan Token Details (Required)</p>
            <input
              type="text"
              placeholder="Token Name (e.g., StreamerFanToken)"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="bg-white/10 text-white placeholder-white/50 border border-white/20 px-4 py-2 rounded-lg focus:outline-none text-sm"
            />
            <input
              type="text"
              placeholder="Token Symbol (e.g., SFT)"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              maxLength={10}
              className="bg-white/10 text-white placeholder-white/50 border border-white/20 px-4 py-2 rounded-lg focus:outline-none text-sm"
            />
            {tokenDeploymentStatus && (
              <div className={`text-xs p-2 rounded ${
                tokenDeploymentStatus.success 
                  ? "bg-green-900/30 text-green-300" 
                  : "bg-yellow-900/30 text-yellow-300"
              }`}>
                {tokenDeploymentStatus.message}
              </div>
            )}
          </div>
        )}

        {isHost && !wallet && (
          <p className="text-xs text-yellow-400 text-center">
            Connect wallet to deploy fan token
          </p>
        )}

        <button
          onClick={handleJoin}
          disabled={isDeployingToken}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 cursor-pointer"
        >
          {isDeployingToken ? "Deploying Token..." : "Join Room"}
        </button>
      </div>
    </div>
  );
};

export default JoinForm;
