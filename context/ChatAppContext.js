import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";

import getContract from "../utils/getContract";

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const { address, isConnected, isDisconnected } = useAccount();

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
    if (isDisconnected) {
      window.location.reload();
    }
    // if address change setFriendMsg to empty array and currentUserName to empty string
    setFriendMsg([]);
    setCurrentUserName("");
  }, [address]);

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
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
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
      router.push("/");
      window.location.reload();
      toast.success("Friend Added Successfully");
    } catch (error) {
      toast.error(
        "Something went wrong, please try again later or connect to wallet"
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
      window.location.reload();
      // wait 5 seconds and then show success message
      setTimeout(() => {
        toast.success("Message Sent Successfully");
      }, 100);
    } catch (error) {
      toast.error("Something went wrong, please try again later");
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
