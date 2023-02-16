import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import getContract from "../utils/getContract";

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const { address, isConnected } = useAccount();

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

  const router = useRouter();

  // Fetch Data from Blockchain
  const fetchData = async () => {
    try {
      // Check if user is connected to wallet
      if (!isConnected) return;
      // Get Contract Instance from utils/getContract.js
      const contract = getContract();
      // Get User Name if exist
      const userName = await contract.getUsername(address);
      setUserName(userName);
      // Get All Friends List
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      // Get All User List
      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [address]);

  // Read Message
  const readMessage = async (friendAddress) => {
    try {
      const contract = getContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Create Account
  const createAccount = async ({ name }) => {
    if (!name || !address)
      return toast.error("Please enter your name and connect to wallet");
    try {
      const contract = getContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.message);
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
      router.push("/");
      window.location.reload();
      toast.success("Friend Added Successfully");
    } catch (error) {
      toast.error(error.message);
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
      window.location.reload();
      toast.success("Message Sent Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Read User Info
  const readUser = async (userAddress) => {
    const contract = getContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
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
        readUser,
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
