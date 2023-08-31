import { useState, useEffect, createContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers"; // For conversion functions

import getContract from "../utils/getContract";

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  const router = useRouter();

  // UseStates
  const [userName, setUserName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [search, setSearch] = useState("");

  // Current User Info
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  // Convert string to bytes32
  const toBytes32 = (str) => {
    return ethers.utils.formatBytes32String(str);
  };

  // Convert bytes32 to string
  const fromBytes32 = (bytes) => {
    const result = ethers.utils.parseBytes32String(bytes);
    console.log("fromBytes32 result:", result);
    return result;
  };

  const clear = () => {
    setUserName("");
    setFriendLists([]);
    setFriendMsg([]);
    setUserLists([]);
    setCurrentUserName("");
    setCurrentUserAddress("");
  };

  // Fetch Data from Blockchain
  const fetchData = useCallback(async () => {
    try {
      if (!isConnected) return;

      const contract = getContract();

      // Check the returned type from the contract. If it's not in bytes32 format anymore, adjust as needed.
      const userName = await contract.getUsername(address);
      setUserName(fromBytes32(userName)); // This assumes you have a fromBytes32 utility function to convert bytes32 to string

      const userPic = await contract.getUserProfilePic(address); // Get the profile picture from the smart contract
      setProfilePicture(userPic); // Update the state with the retrieved profile picture

      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists); // If the returned result is already an array of addresses

      // Fetch user list and convert names
      const rawUserList = await contract.getAllAppUser();
      const processedUserList = rawUserList.map((user) => {
        return {
          ...user,
          name: fromBytes32(user.name), // Convert each user's name from bytes32 to string
        };
      });
      setUserLists(processedUserList);
    } catch (error) {
      toast.error("Please create an account first");
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchData();

    if (isDisconnected) {
      router.push("/");
      clear();
    }

    // if address change setFriendMsg to empty array and currentUserName to empty string
    setFriendMsg([]);
    setCurrentUserName("");
  }, [address, fetchData, isDisconnected, router]);

  // Read Message
  const readMessage = async (friendAddress) => {
    try {
      const contract = getContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      toast.error("Please connect to wallet");
    }
  };

  // Create Account
  const createAccount = async ({ name, picCid }) => {
    if (!name || !address || !picCid)
      // Check for picCid value too
      return toast.error(
        "Please enter your name, profile picture, and connect to wallet"
      );

    try {
      const contract = getContract();
      const getCreatedUser = await contract.createAccount(name, picCid); // Pass the picCid to the smart contract method
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      fetchData(); // Refresh data after creating an account.
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error("Please try again later or connect to wallet");
    }
  };

  // Add Friends
  const addFriends = async ({ name, userAddress }) => {
    if (!name || !userAddress)
      return toast.error(
        "Please provide the name and address of the user you wish to add."
      );

    try {
      if (friendLists.includes(userAddress)) {
        toast.error("You are already friends with this user");
        return;
      }
      if (userAddress === address) {
        toast.error("You can't add yourself as a friend");
        return;
      }

      const contract = getContract();
      const addMyFriend = await contract.addFriend(userAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      fetchData(); // Refresh data after adding a friend.
      router.push("/");
      toast.success("Friend Added Successfully");
    } catch (error) {
      toast.error(
        "Ensure this address has an account and hasn't been added as a friend already"
      );
    }
  };

  // Remove Friend function
  const removeFriend = async (friendAddress) => {
    try {
      const contract = getContract();
      const removeTx = await contract.removeFriend(friendAddress);
      setLoading(true);
      await removeTx.wait();
      setLoading(false);
      fetchData(); // Refresh friend list after removing a friend.
      toast.success("Friend Removed Successfully");
    } catch (error) {
      toast.error("Failed to remove friend");
    }
  };

  // Send Message to Friends
  const sendMessage = async ({ msg, address }) => {
    try {
      const contract = getContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      await readMessage(address);
      toast.success("Message Sent Successfully");
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  // Delete Message
  const deleteMessage = async ({ friendAddress, index }) => {
    try {
      const contract = getContract();
      const deleteTx = await contract.deleteMessage(friendAddress, index);
      setLoading(true);
      await deleteTx.wait();
      setLoading(false);
      await readMessage(friendAddress); // Refresh messages after deletion.
      toast.success("Message Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  // Read User Info
  const readUser = async (userAddress) => {
    const contract = getContract();
    const bytesUserName = await contract.getUsername(userAddress);
    setCurrentUserName(fromBytes32(bytesUserName)); // Convert bytes32 to string
    setCurrentUserAddress(userAddress);
  };

  return (
    // Provider for all children
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        removeFriend,
        sendMessage,
        deleteMessage,
        readUser,
        fromBytes32,
        clear,
        userName,
        profilePicture,
        friendLists,
        friendMsg,
        setFriendMsg,
        userLists,
        loading,
        setLoading,
        currentUserName,
        currentUserAddress,
        search,
        setSearch,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
