const hre = require("hardhat");
const fs = require("fs-extra");

async function main() {
  // Deploy the contract using the "Chat" smart contract
  const chat = await hre.ethers.deployContract("Chat");

  // Wait for the deployment process to complete
  await chat.waitForDeployment();

  // Log the target address of the deployed contract
  console.log(`Chat deployed to: ${chat.target}`);

  // Write the target address to a new file called "config.js"
  fs.writeFileSync(
    "config.js",
    `
    export const contractAddress = "${chat.target}";
    `
  );
}

// Catch and handle any errors that occur during deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
