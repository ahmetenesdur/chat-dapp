const hre = require("hardhat");

// The address of the smart contract to be verified
const contractAddress = "0x5b222b328e8F1Aa86a8BADD712F57fb42ACA9e15";

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
