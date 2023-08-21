import { ethers } from "ethers";
// Import the compiled contract json artifact
import Contract from "../artifacts/contracts/Chat.sol/Chat.json";
// Import the contract address from the config file
import { contractAddress } from "../config";

export default function getContract() {
  // Check that window.ethereum is available
  if (!window.ethereum) {
    throw new Error(
      "Ethereum provider is not detected. Install or enable MetaMask (or another web3 provider)."
    );
  }

  // Create a new Web3Provider instance and pass it the window.ethereum object
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Get the signer from the provider
  const signer = provider.getSigner();
  // Create and return a new instance of Contract connected to the signer
  const contract = new ethers.Contract(contractAddress, Contract.abi, signer);

  return contract;
}
