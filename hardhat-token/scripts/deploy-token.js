const hre = require("hardhat");
const readline = require("readline");

/**
 * Interactive token deployment script
 * Prompts user for token details and deploys to the selected network
 */

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promise wrapper for readline question
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log("\n Custom Token Deployment Script\n");
  console.log("=" .repeat(50));
  
  // Get network info
  const network = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  
  console.log(`\n📍 Network: ${network}`);
  console.log(`💼 Deployer Address: ${deployer.address}`);
  console.log(`💰 Balance: ${hre.ethers.formatEther(balance)} CHZ\n`);
  
  if (balance === 0n) {
    console.error("❌ Insufficient balance. Please fund your wallet first.");
    process.exit(1);
  }
  
  // Get token details from user
  const tokenName = await question("📝 Enter token name (e.g., MyToken): ");
  const tokenSymbol = await question("🔤 Enter token symbol (e.g., MTK): ");
  const initialSupply = await question("💎 Enter initial supply (e.g., 1000000): ");
  const decimals = await question("🔢 Enter decimals (default 18, press Enter): ") || "18";
  
  console.log("\n" + "=".repeat(50));
  console.log("\n📋 Token Details:");
  console.log(`   Name: ${tokenName}`);
  console.log(`   Symbol: ${tokenSymbol}`);
  console.log(`   Initial Supply: ${initialSupply}`);
  console.log(`   Decimals: ${decimals}`);
  console.log(`   Minting to: ${deployer.address}\n`);
  
  const confirm = await question("✅ Proceed with deployment? (yes/no): ");
  
  if (confirm.toLowerCase() !== "yes" && confirm.toLowerCase() !== "y") {
    console.log("\n❌ Deployment cancelled.");
    rl.close();
    process.exit(0);
  }
  
  console.log("\n⏳ Deploying token contract...\n");
  
  try {
    // Deploy the contract
    const CustomToken = await hre.ethers.getContractFactory("CustomToken");
    const token = await CustomToken.deploy(
      tokenName,
      tokenSymbol,
      parseInt(initialSupply),
      parseInt(decimals)
    );
    
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    
    // Get token details
    const name = await token.name();
    const symbol = await token.symbol();
    const totalSupply = await token.totalSupply();
    const ownerBalance = await token.balanceOf(deployer.address);
    
    console.log("=" .repeat(50));
    console.log("\n✅ Token deployed successfully!\n");
    console.log("📄 Contract Details:");
    console.log(`   Address: ${tokenAddress}`);
    console.log(`   Name: ${name}`);
    console.log(`   Symbol: ${symbol}`);
    console.log(`   Total Supply: ${hre.ethers.formatUnits(totalSupply, decimals)} ${symbol}`);
    console.log(`   Your Balance: ${hre.ethers.formatUnits(ownerBalance, decimals)} ${symbol}`);
    console.log(`   Network: ${network}`);
    
    if (network === "chilizSpicy") {
      console.log(`\n🔗 View on Explorer:`);
      console.log(`   https://testnet.chiliscan.com/address/${tokenAddress}`);
    } else if (network === "chiliz") {
      console.log(`\n🔗 View on Explorer:`);
      console.log(`   https://chiliscan.com/address/${tokenAddress}`);
    }
    
    console.log("\n=" + "=".repeat(50));
    console.log("\n💡 Save this contract address to use in your app:");
    console.log(`   VITE_TOKEN_CONTRACT_ADDRESS=${tokenAddress}\n`);
    
  } catch (error) {
    console.error("\n❌ Deployment failed:");
    console.error(error.message);
    process.exit(1);
  }
  
  rl.close();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

