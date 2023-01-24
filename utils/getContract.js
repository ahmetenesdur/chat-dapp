import { ethers } from "ethers";
// Import the compiled contract json artifact
import Contract from "../artifacts/contracts/Chat.sol/Chat.json";
// Import the contract address from the config file
import { contractAddress } from "../config";

export default function getContract() {
  // Create a new Web3Provider instance and pass it the window.ethereum object
  // which is an instance of the Ethereum provider injected by MetaMask or other web3 providers
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Get the signer from the provider which is used to sign transactions sent from the current user's account
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
  return contract;
}
