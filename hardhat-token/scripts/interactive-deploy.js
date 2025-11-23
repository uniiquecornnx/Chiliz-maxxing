/**
 * Interactive deployment script that prompts for all details
 * Run with: node scripts/interactive-deploy.js
 */

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log("\n🎯 Interactive Token Deployment");
  console.log("=" .repeat(50));
  
  // Select network
  console.log("\n Select Network:");
  console.log("1. Local Hardhat Network (for testing)");
  console.log("2. Chiliz Spicy Testnet");
  console.log("3. Chiliz Mainnet");
  
  const networkChoice = await question("\nEnter your choice (1-3): ");
  
  let network;
  switch(networkChoice) {
    case "1":
      network = "localhost";
      console.log("\n  Make sure Hardhat node is running:");
      console.log("   Run 'npm run node' in another terminal\n");
      const continueLocal = await question("Continue? (yes/no): ");
      if (continueLocal.toLowerCase() !== "yes") {
        process.exit(0);
      }
      break;
    case "2":
      network = "chilizSpicy";
      break;
    case "3":
      network = "chiliz";
      console.log("\n⚠️  WARNING: You are deploying to MAINNET!");
      const confirmMainnet = await question("Are you sure? (yes/no): ");
      if (confirmMainnet.toLowerCase() !== "yes") {
        process.exit(0);
      }
      break;
    default:
      console.log("❌ Invalid choice");
      process.exit(1);
  }
  
  console.log(`\n✅ Selected network: ${network}\n`);
  
  // Run the deployment script
  try {
    execSync(`npx hardhat run scripts/deploy-token.js --network ${network}`, {
      stdio: 'inherit'
    });
  } catch (error) {
    console.error("\n❌ Deployment failed");
    process.exit(1);
  }
  
  rl.close();
}

main();

