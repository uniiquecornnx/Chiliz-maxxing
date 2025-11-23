const hre = require("hardhat");

async function main() {
  console.log("\n🚀 CreatorTip Contract Deployment\n");
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
  
  // Creator address (the streamer who receives tips)
  const creatorAddress = deployer.address;
  
  console.log("📋 Contract Details:");
  console.log(`   Creator Address: ${creatorAddress}`);
  console.log(`   (Tips will be sent to this address)\n`);
  
  console.log("⏳ Deploying CreatorTip contract...\n");
  
  try {
    // Deploy the contract
    const CreatorTip = await hre.ethers.getContractFactory("CreatorTip");
    const creatorTip = await CreatorTip.deploy(creatorAddress);
    
    await creatorTip.waitForDeployment();
    const contractAddress = await creatorTip.getAddress();
    
    // Get contract details
    const creator = await creatorTip.creator();
    const contractBalance = await creatorTip.getBalance();
    
    console.log("=" .repeat(50));
    console.log("\n✅ CreatorTip contract deployed successfully!\n");
    console.log("📄 Contract Details:");
    console.log(`   Address: ${contractAddress}`);
    console.log(`   Creator: ${creator}`);
    console.log(`   Balance: ${hre.ethers.formatEther(contractBalance)} CHZ`);
    console.log(`   Network: ${network}`);
    
    if (network === "chilizSpicy") {
      console.log(`\n🔗 View on Explorer:`);
      console.log(`   https://testnet.chiliscan.com/address/${contractAddress}`);
    } else if (network === "chiliz") {
      console.log(`\n🔗 View on Explorer:`);
      console.log(`   https://chiliscan.com/address/${contractAddress}`);
    }
    
    console.log("\n=" + "=".repeat(50));
    console.log("\n💡 Add this to your .env file:");
    console.log(`   VITE_CREATOR_TIP_CONTRACT_ADDRESS=${contractAddress}\n`);
    console.log("📝 After adding to .env, restart your dev server:");
    console.log("   npm run dev\n");
    
  } catch (error) {
    console.error("\n❌ Deployment failed:");
    console.error(error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

