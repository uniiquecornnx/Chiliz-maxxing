# 🎮 Chiliz Maxxing - Fan Ownership Through Live Streaming

> **Empowering creators and fans with true ownership through tokenized engagement**

A decentralized live streaming platform built on Chiliz that automatically deploys fan tokens for creators and enables direct CHZ tipping. Fans gain real ownership through personalized tokens that represent their connection to their favorite streamers, while creators maintain direct economic relationships with their community.

## 🏆 Prize Track: Fan Ownership

StreamToken transforms passive viewership into active ownership by:

- **🪙 Automatic Fan Token Deployment** - Every streamer gets their own ERC20 token instantly when going live
- **💰 Direct Creator Economics** - Fans tip with CHZ, no middlemen
- **🎯 True Ownership** - Fans hold tokens representing their relationship with creators
- **⚡ Instant Tokenization** - Deploy tokens in 15 seconds, no technical knowledge required
- **🔗 Blockchain Native** - Built on Chiliz network for sports & entertainment communities

## ✨ Features

### For Creators/Streamers

- **One-Click Token Launch** - Deploy your fan token automatically when starting a stream
- **Custom Token Parameters** - Choose your token name, symbol, and initial supply
- **Direct Tipping** - Receive CHZ tips instantly with on-chain transparency
- **Withdraw Anytime** - Full control over your earnings
- **Zero Platform Fees** - Keep 100% of tips and token value

### For Fans

- **Own Creator Tokens** - Hold tokens from your favorite streamers
- **Tip with Crypto** - Send CHZ tips with optional messages
- **Transparent Economics** - All transactions visible on blockchain
- **Wallet Integration** - Connect with MetaMask or any Web3 wallet
- **Participation Proof** - Tokens prove your early support and loyalty

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     StreamToken Platform                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │              │      │              │      │           │ │
│  │  Live Stream │─────▶│  Fan Token   │─────▶│  Chiliz   │ │
│  │  (ZegoCloud) │      │  Deployment  │      │  Testnet  │ │
│  │              │      │  (Hardhat)   │      │           │ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                     │
│  │              │      │              │                     │
│  │  Tip System  │─────▶│  CreatorTip  │                     │
│  │  (React UI)  │      │  Contract    │                     │
│  │              │      │              │                     │
│  └──────────────┘      └──────────────┘                     │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Thirdweb SDK - Wallet Management             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Deployed Contracts (Chiliz Spicy Testnet)

### CreatorTip Contract
- **Address:** `0x5dB677e624315c6D353C644E1243d666BfFb4949`
- **Purpose:** Handles all tipping functionality
- **Explorer:** [View on ChiliScan](https://testnet.chiliscan.com/address/0x5dB677e624315c6D353C644E1243d666BfFb4949)

### Sample Fan Token
- **Address:** `0x94295c2971b22679374FAE99e78f8e0DEC15A44a`
- **Name:** fd
- **Symbol:** FEDS
- **Explorer:** [View on ChiliScan](https://testnet.chiliscan.com/address/0x94295c2971b22679374FAE99e78f8e0DEC15A44a)

**Network Details:**
- **Network:** Chiliz Spicy Testnet
- **Chain ID:** 88882
- **RPC:** https://spicy-rpc.chiliz.com
- **Faucet:** https://testnet.chiliscan.com/faucet

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Thirdweb SDK** - Web3 wallet integration
- **Tailwind CSS** - Styling
- **ZegoCloud** - Live streaming infrastructure

### Smart Contracts
- **Solidity 0.8.20** - Contract language
- **Hardhat** - Development framework
- **OpenZeppelin** - Secure contract libraries
- **Ethers.js v5** - Blockchain interaction

### Blockchain
- **Chiliz Spicy Testnet** - Deployment network
- **ERC20 Standard** - Fan token implementation
- **Custom Tipping Contract** - Direct payments

## 📦 Installation & Setup

### Prerequisites

- Node.js 16+
- MetaMask or compatible Web3 wallet
- CHZ tokens for gas (get from [faucet](https://testnet.chiliscan.com/faucet))

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/streamtoken.git
cd streamtoken
```

### 2. Install Dependencies

```bash
# Frontend dependencies
npm install

# Hardhat dependencies
cd hardhat-token
npm install
cd ..
```

### 3. Environment Setup

Create `.env` file in root:

```env
# Thirdweb
VITE_THIRDWEB_CLIENT_ID=your_client_id

# ZegoCloud (Live Streaming)
VITE_ZEGOCLOUD_APP_ID=your_app_id
VITE_ZEGOCLOUD_SERVER_SECRET=your_server_secret

# CreatorTip Contract
VITE_CREATOR_TIP_CONTRACT_ADDRESS=0x5dB677e624315c6D353C644E1243d666BfFb4949
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 🎯 Usage Guide

### For Streamers

1. **Connect Wallet**
   - Click "Connect Wallet"
   - Approve connection in MetaMask
   - Ensure you're on Chiliz Spicy Testnet

2. **Create Stream with Token**
   - Enter Room ID and User ID
   - Check "I'm a streamer/host"
   - Enter your fan token name (e.g., "MyFanToken")
   - Enter token symbol (e.g., "MFT")
   - Click "Join Room"

3. **Deploy Token**
   - Approve transaction in wallet
   - Wait 15-30 seconds
   - Token deployed automatically!
   - 1,000,000 tokens minted to your wallet

4. **Receive Tips**
   - Fans can tip during stream
   - Tips accumulate in CreatorTip contract
   - Withdraw anytime using contract

### For Fans

1. **Watch Stream**
   - Enter Room ID to join
   - No token needed to watch

2. **Tip Creator**
   - Connect wallet
   - Enter tip amount in CHZ
   - Add optional message
   - Click "Send Tip"
   - Approve transaction

3. **Hold Creator Tokens**
   - Creator's tokens distributed
   - Add token to wallet using contract address
   - Hold as proof of support

## 🔧 Deploy Your Own Contracts

### Deploy CreatorTip Contract

```bash
cd hardhat-token

# Add your private key to .env
echo "PRIVATE_KEY=your_private_key" > .env

# Deploy
npm run deploy:tip
```

### Deploy Fan Token

Two options:

**Option 1: Automatic (via app)**
- Use the app interface when creating a stream
- Token deploys in ~15 seconds

**Option 2: Manual (via Hardhat)**
```bash
cd hardhat-token
npm run deploy
```

## 💡 Fan Ownership Innovation

### How It Creates True Ownership

1. **Tokenized Creator Identity**
   - Each creator gets a unique ERC20 token
   - Fans hold these tokens as ownership proof
   - Tokens can appreciate with creator success

2. **Direct Economic Relationship**
   - No platform taking cuts
   - Transparent on-chain transactions
   - Fans directly support creators

3. **Programmable Engagement**
   - Tokens can unlock features
   - Holders can get exclusive access
   - DAO governance potential

4. **Portable Value**
   - Tokens exist independently of platform
   - Tradeable on any DEX
   - True digital ownership

### Future Roadmap

- **Dynamic Token Features** - Tokens that evolve with engagement
- **DAO Governance** - Token holders vote on creator decisions
- **NFT Integration** - Milestone NFTs for top supporters
- **Token Staking** - Earn rewards for holding
- **Cross-Platform** - Use tokens across multiple apps
- **AI Fan Agents** - AI representing fan identity and preferences

## 📊 Smart Contract Details

### CustomToken (ERC20)

```solidity
// Fan tokens with built-in features
- Standard ERC20 functionality
- Mint function (owner only)
- Burn function (any holder)
- 18 decimals (standard)
- OpenZeppelin security
```

**Features:**
- ✅ Transfer between wallets
- ✅ Check balances
- ✅ Approve spending
- ✅ Mint additional tokens
- ✅ Burn tokens

### CreatorTip Contract

```solidity
// Direct tipping with messages
function tip(string calldata message) external payable
function withdraw() external onlyCreator
function getBalance() external view returns (uint256)
```

**Features:**
- ✅ Send tips with messages
- ✅ Creator-only withdrawal
- ✅ View contract balance
- ✅ Update creator address
- ✅ Event logging

## 🔐 Security

- **OpenZeppelin Contracts** - Industry standard security
- **Hardhat Testing** - Comprehensive test coverage
- **No Upgradeable Contracts** - Immutable, predictable
- **Creator-Only Functions** - Protected withdrawals
- **Event Logging** - Full transparency

## 🌐 Network Configuration

### Chiliz Spicy Testnet

Add to MetaMask:

```
Network Name: Chiliz Spicy Testnet
RPC URL: https://spicy-rpc.chiliz.com
Chain ID: 88882
Currency Symbol: CHZ
Block Explorer: https://testnet.chiliscan.com
```

### Get Testnet CHZ

1. Visit https://testnet.chiliscan.com/faucet
2. Enter your wallet address
3. Request tokens
4. Wait for confirmation

## 📈 Use Cases

### Sports Fans
- Athletes deploy tokens for their fanbase
- Fans own tokens representing support
- Direct tipping during live training sessions

### Content Creators
- Streamers build token-based communities
- Early supporters hold valuable tokens
- Direct monetization without platforms

### Esports Teams
- Team tokens for fans
- Governance for team decisions
- Exclusive content for token holders

### Music Artists
- Artist tokens for superfans
- VIP access for holders
- Direct support through tips

## 🤝 Contributing

We welcome contributions! Areas for improvement:

- Frontend UI/UX enhancements
- Additional smart contract features
- Mobile responsiveness
- Token staking mechanisms
- DAO governance integration
- NFT milestone rewards

## 📝 License

MIT License - see LICENSE file

## 🔗 Links

- **Live Demo:** [TBD]
- **GitHub:** [Repository](https://github.com/yourusername/streamtoken)
- **Chiliz Testnet Explorer:** https://testnet.chiliscan.com
- **Thirdweb:** https://thirdweb.com
- **ZegoCloud:** https://zegocloud.com

## 👥 Team

Built for Chiliz Hackathon - Fan Ownership Track

## 🙏 Acknowledgments

- **Chiliz** - Blockchain infrastructure
- **Thirdweb** - Web3 development tools
- **ZegoCloud** - Live streaming solution
- **OpenZeppelin** - Smart contract security
- **Hardhat** - Development framework

---

**Built with ❤️ for the Chiliz ecosystem**

*Empowering true fan ownership through blockchain technology*
