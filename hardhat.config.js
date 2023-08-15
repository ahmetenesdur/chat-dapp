require("@nomicfoundation/hardhat-toolbox");
// Import the dotenv library to read environment variables from the .env.local file
require("dotenv").config({
  path: "./.env.local",
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: process.env.RPC_URL,
      chainId: 97,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY,
  },
};
