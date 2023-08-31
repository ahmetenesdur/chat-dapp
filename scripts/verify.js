const hre = require("hardhat");

// The address of the smart contract to be verified
const contractAddress = "0x8DaB19a81a1203aD0d35A4be93E44aDC54C08633";

async function main() {
  // Use hardhat's "verify:verify" command to verify the contract at the specified address
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [],
  });

  console.log("Contract verified!");
}

// If an error occurs, log the error and set the process exit code to 1
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
