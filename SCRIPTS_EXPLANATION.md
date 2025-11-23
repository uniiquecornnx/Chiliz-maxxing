# Scripts Folder Explanation

This document explains what each script in the `scripts/` folder does and when to use them.

## 📁 Scripts Overview

You have **4 deployment scripts**, but you only need **ONE** - `deploy-via-api.js` (the one that's ready to use).

---

## 1. `deploy-via-api.js` ⭐ **USE THIS ONE**

**What it does:**
- Deploys your contract using **Thirdweb's REST API** (HTTP POST request)
- Uses the bytecode and ABI you compiled from Remix
- Sends deployment request to `https://api.thirdweb.com/v1/contracts`

**How it works:**
1. Reads your compiled bytecode and ABI (you paste them in the script)
2. Sends a POST request to Thirdweb API with:
   - Your secret key (authentication)
   - Deployer wallet address
   - Chain ID (88882 for testnet, 88888 for mainnet)
   - Bytecode and ABI
3. Thirdweb handles the actual deployment on-chain
4. Returns the contract address

**When to use:**
- ✅ **This is the one you should use!**
- After compiling in Remix and getting bytecode/ABI
- When you want to deploy via API (simpler, no SDK needed)

**Requirements:**
- `THIRDWEB_SECRET_KEY` environment variable
- `DEPLOYER_ADDRESS` environment variable
- Compiled bytecode and ABI from Remix (paste into script)

**Usage:**
```bash
export THIRDWEB_SECRET_KEY="your-secret-key"
export DEPLOYER_ADDRESS="0xYourWalletAddress"
node scripts/deploy-via-api.js testnet
```

**Status:** ✅ Ready to use (just needs bytecode/ABI from Remix)

---

## 2. `deploy-simple.js`

**What it does:**
- Deploys using **Thirdweb SDK** (JavaScript library)
- Uses `deployContract()` function from `thirdweb/deploys`
- More programmatic approach

**How it works:**
1. Creates a Thirdweb client
2. Creates a wallet account from private key
3. Defines the Chiliz chain
4. Calls `deployContract()` with bytecode and ABI
5. Returns the deployed contract address

**When to use:**
- If you prefer SDK over API
- When you want more control over the deployment process
- For programmatic deployments in larger projects

**Requirements:**
- `THIRDWEB_SECRET_KEY` environment variable
- `PRIVATE_KEY` environment variable (wallet private key)
- Compiled bytecode and ABI (paste into script)

**Usage:**
```bash
export THIRDWEB_SECRET_KEY="your-secret-key"
export PRIVATE_KEY="your-private-key"
node scripts/deploy-simple.js testnet
```

**Status:** ⚠️ Needs bytecode/ABI (has placeholder)

**Difference from `deploy-via-api.js`:**
- Uses SDK instead of API
- Requires private key (not just address)
- More code, but more flexible

---

## 3. `deploy.js`

**What it does:**
- **Helper script** - doesn't actually deploy
- Checks your setup and shows instructions
- Validates environment variables
- Shows your wallet balance

**How it works:**
1. Checks if environment variables are set
2. Creates a Thirdweb client
3. Creates wallet account from private key
4. Checks your CHZ balance
5. Shows instructions on what to do next

**When to use:**
- To check if your setup is correct
- To verify your wallet has enough CHZ
- To see deployment instructions
- **NOT for actual deployment**

**Requirements:**
- `THIRDWEB_SECRET_KEY` environment variable
- `PRIVATE_KEY` environment variable

**Usage:**
```bash
export THIRDWEB_SECRET_KEY="your-secret-key"
export PRIVATE_KEY="your-private-key"
node scripts/deploy.js testnet
```

**Status:** ℹ️ Helper/validation script only

---

## 4. `deploy-api.js`

**What it does:**
- **Instruction script** - doesn't deploy
- Reads your contract file
- Shows you example code to deploy
- Provides guidance

**How it works:**
1. Reads `contracts/TipJar.sol` file
2. Shows you example code for SDK deployment
3. Provides instructions

**When to use:**
- To see example deployment code
- For reference/learning
- **NOT for actual deployment**

**Requirements:**
- `THIRDWEB_SECRET_KEY` environment variable
- `PRIVATE_KEY` environment variable

**Usage:**
```bash
export THIRDWEB_SECRET_KEY="your-secret-key"
export PRIVATE_KEY="your-private-key"
node scripts/deploy-api.js testnet
```

**Status:** ℹ️ Reference/instruction script only

---

## 🎯 Which Script Should You Use?

### **Recommended: `deploy-via-api.js`**

**Why?**
- ✅ Simplest method
- ✅ Uses REST API (no complex SDK setup)
- ✅ Already has bytecode and ABI placeholders
- ✅ Clear error messages
- ✅ Ready to use after Remix compilation

**Steps:**
1. Compile in Remix → Get bytecode and ABI
2. Paste them into `deploy-via-api.js`
3. Set environment variables
4. Run the script

---

## 📊 Comparison Table

| Script | Method | Deploys? | Needs Bytecode? | Best For |
|--------|--------|----------|-----------------|----------|
| `deploy-via-api.js` | REST API | ✅ Yes | ✅ Yes | **Most users** |
| `deploy-simple.js` | SDK | ✅ Yes | ✅ Yes | SDK preference |
| `deploy.js` | Helper | ❌ No | ❌ No | Validation |
| `deploy-api.js` | Helper | ❌ No | ❌ No | Reference |

---

## 🔧 Quick Setup for `deploy-via-api.js`

1. **Get bytecode from Remix:**
   - Compile → Compilation Details → Bytecode → Copy "object"

2. **Get ABI from Remix:**
   - Compilation Details → ABI → Copy JSON array

3. **Update the script:**
   - Open `scripts/deploy-via-api.js`
   - Replace `bytecode` variable (line 46)
   - Replace `abi` array (line 47)

4. **Set environment variables:**
   ```bash
   export THIRDWEB_SECRET_KEY="G9IPx7zG331IUQT9oigDgL4hn901k_hX7ZZ9Y7sVYsNtcwOk4KCrnLyBSc8a4hyyY00QD77hg_OdIIahyMp6Zg"
   export DEPLOYER_ADDRESS="0xYourWalletAddress"
   ```

5. **Deploy:**
   ```bash
   node scripts/deploy-via-api.js testnet
   ```

---

## 💡 Summary

- **Use `deploy-via-api.js`** - It's ready and the simplest
- The other scripts are helpers/references
- All scripts need compiled bytecode/ABI from Remix
- `deploy-via-api.js` is the one you should focus on!

