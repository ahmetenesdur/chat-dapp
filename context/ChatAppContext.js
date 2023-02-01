import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import getContract from "../utils/getContract";

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const { address } = useAccount();

  // UseStates
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  // Current User Info
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  // Fetch Data from Blockchain
  const fetchData = async () => {
    try {
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
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Read Message
  const readMessage = async (friendAddress) => {
    try {
      const contract = getContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      console.log("Currently You Have no Message");
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
    } catch (error) {
      setError("Something went wrong while creating account, try again");
    }
  };

  // Add Friends
  const addFriends = async ({ name, accountAddress }) => {
    try {
      const contract = getContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong while adding friends, try again");
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
    } catch (error) {
      setError("Please reload and try again");
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
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
