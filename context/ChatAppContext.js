import { useState, useEffect, createContext, useCallback } from "react";
import { useRouter } from "next/router";
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
    return ethers.utils.parseBytes32String(bytes);
  };

  // Fetch Data from Blockchain
  const fetchData = useCallback(async () => {
    try {
      if (!isConnected) return;

      const contract = getContract();

      // Check the returned type from the contract. If it's not in bytes32 format anymore, adjust as needed.
      const userName = await contract.getUsername(address);
      setUserName(fromBytes32(userName)); // This assumes you have a fromBytes32 utility function to convert bytes32 to string

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
      console.error(error);
      toast.error("Please create an account first");
    }
  }, [address, isConnected]);

  useEffect(() => {
    fetchData();

    if (isDisconnected) {
      window.location.reload();
    }

    // if address change setFriendMsg to empty array and currentUserName to empty string
    setFriendMsg([]);
    setCurrentUserName("");
  }, [address, fetchData]);

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
  const createAccount = async ({ name }) => {
    if (!name || !address)
      return toast.error("Please enter your name and connect to wallet");

    try {
      const contract = getContract();
      const getCreatedUser = await contract.createAccount(name); // Convert string to bytes32
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
      toast.success("Friend Added Successfully");
    } catch (error) {
      toast.error(
        "Please sure this address is having an account or you have already added this address as a friend"
      );
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
        sendMessage,
        deleteMessage,
        readUser,
        fromBytes32,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
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
