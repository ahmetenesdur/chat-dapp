const hre = require("hardhat");
const fs = require("fs-extra");

async function main() {
  // Deploy the contract using the "Chat" smart contract
  const Chat = await hre.ethers.getContractFactory("Chat");
  const chat = await Chat.deploy();

  // Wait for the deployment process to complete
  await chat.deployed();

  // Log the address of the deployed contract
  console.log(`Chat deployed to: ${chat.address}`);

  // Write the address to a new file called "config.js"
  fs.writeFileSync(
    "config.js",
    `
    export const contractAddress = "${chat.address}";
    `
  );
}

// Catch and handle any errors that occur during deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
