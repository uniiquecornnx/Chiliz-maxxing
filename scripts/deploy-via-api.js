/**
 * Deploy TipJar contract using Thirdweb API
 * 
 * This script uses the Thirdweb API to deploy the contract.
 * You need to compile the contract first to get bytecode and ABI.
 * 
 * Steps:
 * 1. Compile TipJar.sol using Remix IDE (easiest):
 *    - Go to https://remix.ethereum.org
 *    - Create TipJar.sol and paste the contract code
 *    - Compile with Solidity 0.8.20
 *    - Copy the bytecode and ABI
 * 
 * 2. Set environment variables:
 *    export THIRDWEB_SECRET_KEY="your-secret-key"
 *    export DEPLOYER_ADDRESS="0x..." (wallet address that will deploy)
 * 
 * 3. Update the bytecode and abi variables below
 * 
 * 4. Run: node scripts/deploy-via-api.js [testnet|mainnet]
 */

const secretKey = process.env.THIRDWEB_SECRET_KEY;
const deployerAddress = process.env.DEPLOYER_ADDRESS;

if (!secretKey) {
  console.error("❌ THIRDWEB_SECRET_KEY is not set");
  console.log("Get it from: https://thirdweb.com/dashboard → Settings → API Keys");
  process.exit(1);
}

if (!deployerAddress) {
  console.error("❌ DEPLOYER_ADDRESS is not set");
  console.log("This should be the wallet address that will deploy the contract");
  process.exit(1);
}

const chainArg = process.argv[2] || "testnet";
const chainId = chainArg === "mainnet" ? 88888 : 88882;
const chainName = chainArg === "mainnet" ? "Chiliz Chain" : "Chiliz Spicy Testnet";

console.log(`\n🚀 Deploying TipJar to ${chainName} (Chain ID: ${chainId})\n`);

// TODO: Replace these with your compiled bytecode and ABI from Remix
// Get them from Remix IDE after compiling
const bytecode = "0x6080604052348015600e575f5ffd5b50335f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506105f88061005b5f395ff3fe608060405260043610610037575f3560e01c806351cff8d9146100905780638da5cb5b146100b8578063cb56393c146100e25761008c565b3661008c573373ffffffffffffffffffffffffffffffffffffffff167f8d379bddc159e67937283b53edd0858bdd6f8ba659d7bc286617c5afdb4f47803460405161008291906102da565b60405180910390a2005b5f5ffd5b34801561009b575f5ffd5b506100b660048036038101906100b19190610368565b6100fe565b005b3480156100c3575f5ffd5b506100cc6101d3565b6040516100d991906103b3565b60405180910390f35b6100fc60048036038101906100f7919061042d565b6101f7565b005b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461018c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610183906104c2565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166108fc4790811502906040515f60405180830381858888f193505050501580156101cf573d5f5f3e3d5ffd5b5050565b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f3411610239576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102309061052a565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167f8d379bddc159e67937283b53edd0858bdd6f8ba659d7bc286617c5afdb4f478034848460405161028393929190610592565b60405180910390a25050565b5f819050919050565b6102a18161028f565b82525050565b5f82825260208201905092915050565b50565b5f6102c55f836102a7565b91506102d0826102b7565b5f82019050919050565b5f6040820190506102ed5f830184610298565b81810360208301526102fe816102ba565b905092915050565b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6103378261030e565b9050919050565b6103478161032d565b8114610351575f5ffd5b50565b5f813590506103628161033e565b92915050565b5f6020828403121561037d5761037c610306565b5b5f61038a84828501610354565b91505092915050565b5f61039d8261030e565b9050919050565b6103ad81610393565b82525050565b5f6020820190506103c65f8301846103a4565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f8401126103ed576103ec6103cc565b5b8235905067ffffffffffffffff81111561040a576104096103d0565b5b602083019150836001820283011115610426576104256103d4565b5b9250929050565b5f5f6020838503121561044357610442610306565b5b5f83013567ffffffffffffffff8111156104605761045f61030a565b5b61046c858286016103d8565b92509250509250929050565b7f4e6f7420617574686f72697a65640000000000000000000000000000000000005f82015250565b5f6104ac600e836102a7565b91506104b782610478565b602082019050919050565b5f6020820190508181035f8301526104d9816104a0565b9050919050565b7f4e6f207469702073656e740000000000000000000000000000000000000000005f82015250565b5f610514600b836102a7565b915061051f826104e0565b602082019050919050565b5f6020820190508181035f83015261054181610508565b9050919050565b828183375f83830152505050565b5f601f19601f8301169050919050565b5f61057183856102a7565b935061057e838584610548565b61058783610556565b840190509392505050565b5f6040820190506105a55f830186610298565b81810360208301526105b8818486610566565b905094935050505056fea2646970667358221220a976c26e430e1464859c275bdbddc2dd5028e3d3cb1c7307e98f798e1c04767d64736f6c634300081e0033"; // Replace with actual bytecode
const abi = [
    [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "TipReceived",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "tip",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
];

if (bytecode === "YOUR_COMPILED_BYTECODE_HERE") {
  console.error("❌ Please compile the contract first and update the bytecode variable");
  console.log("\n📝 How to get bytecode:");
  console.log("   1. Go to https://remix.ethereum.org");
  console.log("   2. Create TipJar.sol and paste your contract");
  console.log("   3. Compile with Solidity 0.8.20");
  console.log("   4. Go to 'Compilation Details' → 'Bytecode'");
  console.log("   5. Copy the 'object' field (starts with 0x)");
  console.log("   6. Also copy the ABI from 'ABI' section");
  console.log("   7. Update this script with the bytecode and ABI\n");
  process.exit(1);
}

async function deploy() {
  try {
    console.log("⏳ Sending deployment request to Thirdweb API...\n");

    const response = await fetch("https://api.thirdweb.com/v1/contracts", {
      method: "POST",
      headers: {
        "x-secret-key": secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chainId: chainId,
        from: deployerAddress,
        bytecode: bytecode,
        abi: abi,
        // No constructor params needed for TipJar
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const result = await response.json();

    console.log("✅ Deployment initiated successfully!\n");
    console.log(`📍 Contract Address: ${result.result.address}`);
    console.log(`🔗 Transaction ID: ${result.result.transactionId}`);
    console.log(`🌐 Chain: ${chainName} (${chainId})\n`);
    
    const explorerUrl = chainArg === "mainnet" 
      ? `https://chiliscan.com/address/${result.result.address}`
      : `https://testnet.chiliscan.com/address/${result.result.address}`;
    
    console.log(`🔗 View on Explorer: ${explorerUrl}\n`);
    console.log("📝 Add this to your .env file:");
    console.log(`   VITE_TIPJAR_CONTRACT_ADDRESS=${result.result.address}\n`);

  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    if (error.message.includes("401")) {
      console.error("\n💡 Check your THIRDWEB_SECRET_KEY is correct");
    }
    if (error.message.includes("from")) {
      console.error("\n💡 Check your DEPLOYER_ADDRESS is correct");
    }
    process.exit(1);
  }
}

deploy();

