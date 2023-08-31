import { useState, useEffect, createContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { ethers } from "ethers"; // For conversion functions

import getContract from "../utils/getContract";

// Create a context for the chat application
export const ChatAppContext = createContext();

// Provider component for the chat application context
export const ChatAppProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();
  const router = useRouter();

  // UseStates to manage various states in the app
  const [userName, setUserName] = useState(""); // User's name
  const [profilePicture, setProfilePicture] = useState(""); // User's profile picture
  const [friendLists, setFriendLists] = useState([]); // User's list of friends
  const [friendMsg, setFriendMsg] = useState([]); // Messages with a friend
  const [loading, setLoading] = useState(false); // Loading state
  const [userLists, setUserLists] = useState([]); // List of all app users
  const [search, setSearch] = useState(""); // Search input

  // Current User Info states
  const [currentUserName, setCurrentUserName] = useState(""); // Current friend's name
  const [currentUserAddress, setCurrentUserAddress] = useState(""); // Current friend's address

  // Function to convert a string to bytes32 format
  const toBytes32 = (str) => {
    return ethers.utils.formatBytes32String(str);
  };

  // Function to convert bytes32 format to string
  const fromBytes32 = (bytes) => {
    const result = ethers.utils.parseBytes32String(bytes);
    console.log("fromBytes32 result:", result);
    return result;
  };

  // Function to clear all states
  const clear = () => {
    setUserName("");
    setFriendLists([]);
    setFriendMsg([]);
    setUserLists([]);
    setCurrentUserName("");
    setCurrentUserAddress("");
  };

  // Fetch data from the blockchain using useCallback
  const fetchData = useCallback(async () => {
    try {
      if (!isConnected) return;

      const contract = getContract();

      // Fetch and update the user's name from the contract
      const userName = await contract.getUsername(address);
      setUserName(fromBytes32(userName));

      // Fetch and update the user's profile picture
      const userPic = await contract.getUserProfilePic(address);
      setProfilePicture(userPic);

      // Fetch and update the user's friend list
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);

      // Fetch the raw user list and process user names
      const rawUserList = await contract.getAllAppUser();
      const processedUserList = rawUserList.map((user) => {
        return {
          ...user,
          name: fromBytes32(user.name),
        };
      });
      setUserLists(processedUserList);
    } catch (error) {
      toast.error("Please create an account first");
    }
  }, [address, isConnected]);

  // useEffect to fetch data when needed
  useEffect(() => {
    fetchData();

    if (isDisconnected) {
      router.push("/");
      clear();
    }

    // Reset friendMsg and currentUserName if address changes
    setFriendMsg([]);
    setCurrentUserName("");
  }, [address, fetchData, isDisconnected, router]);

  // Function to read messages for a specific friend
  const readMessage = async (friendAddress) => {
    try {
      const contract = getContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      toast.error("Please connect to wallet");
    }
  };

  // Function to create a new user account
  const createAccount = async ({ name, picCid }) => {
    if (!name || !address || !picCid)
      return toast.error(
        "Please enter name, profile picture, and connect to wallet"
      );

    try {
      const contract = getContract();
      const getCreatedUser = await contract.createAccount(name, picCid);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      fetchData();
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error("Please try again later or connect to wallet");
    }
  };

  // Function to add a friend
  const addFriends = async ({ name, userAddress }) => {
    if (!name || !userAddress)
      return toast.error("Please provide name and address of the user to add");

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
      fetchData();
      router.push("/");
      toast.success("Friend Added Successfully");
    } catch (error) {
      toast.error(
        "Ensure this address has an account and hasn't been added as a friend already"
      );
    }
  };

  // Function to remove a friend
  const removeFriend = async (friendAddress) => {
    try {
      const contract = getContract();
      const removeTx = await contract.removeFriend(friendAddress);
      setLoading(true);
      await removeTx.wait();
      setLoading(false);
      fetchData();
      toast.success("Friend Removed Successfully");
    } catch (error) {
      toast.error("Failed to remove friend");
    }
  };

  // Function to send a message to a friend
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

  // Function to delete a message
  const deleteMessage = async ({ friendAddress, index }) => {
    try {
      const contract = getContract();
      const deleteTx = await contract.deleteMessage(friendAddress, index);
      setLoading(true);
      await deleteTx.wait();
      setLoading(false);
      await readMessage(friendAddress);
      toast.success("Message Deleted Successfully");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  // Function to read user information
  const readUser = async (userAddress) => {
    const contract = getContract();
    const bytesUserName = await contract.getUsername(userAddress);
    setCurrentUserName(fromBytes32(bytesUserName));
    setCurrentUserAddress(userAddress);
  };

  return (
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
