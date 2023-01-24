const hre = require("hardhat");
const fs = require("fs-extra");

async function main() {
  // This line creates a new instance of the "Chat" contract using the "hardhat" library.
  const Chat = await hre.ethers.getContractFactory("Chat");
  // This line deploys the contract to the Ethereum network.
  const chat = await Chat.deploy();
  // This line waits for the contract to be deployed on the network.
  await chat.deployed();

  console.log("Chat deployed to:", chat.address);

  // This line writes the address and the owner's address of the deployed contract to a file called "config.js" for later use.
  fs.writeFileSync(
    "config.js",
    `
    export const contractAddress = "${chat.address}";
    export const ownerAddress = "${chat.signer.address}";
    `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1; //This line sets the exit code to 1, indicating an error has occurred.
});
