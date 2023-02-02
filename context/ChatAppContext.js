import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import getContract from "../utils/getContract";

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const { address, isConnected } = useAccount();

  // UseStates
  const [account, setAccount] = useState("");
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
      if (!isConnected) return;
      // Get Contract Instance from utils/getContract.js
      const contract = getContract();
      // Set Current User Address
      setAccount(address);
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
  const createAccount = async ({ name, accountAddress }) => {
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
  const addFriends = async ({ name, accountAddress }) => {
    try {
      if (accountAddress === address) {
        toast.error("You can't add yourself as a friend");
        return;
      }
      if (friendLists.includes(accountAddress)) {
        toast.error("You already added this person as a friend");
        return;
      }

      const contract = getContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
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
        account,
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
