import { useContext } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

import Card from "./Card";
import Chat from "./Chat";
import { ChatAppContext } from "../../context/ChatAppContext";

const Friend = () => {
  const { address } = useAccount();

  const {
    sendMessage,
    deleteMessage,
    friendLists,
    readMessage,
    removeFriend,
    userName,
    loading,
    friendMsg,
    setFriendMsg,
    currentUserName,
    currentUserAddress,
    readUser,
    search,
    clear,
    profilePicture,
  } = useContext(ChatAppContext);

  const fromBytes32 = (bytes) => {
    return ethers.utils.parseBytes32String(bytes);
  };

  return (
    <div className="sm:w-4/5 text-white w-11/12 m-4 mx-auto">
      <div className="grid-cols-1 sm:grid-cols-3 grid gap-8">
        <div className="bg-black/25 p-4 rounded-lg overflow-auto scrollbar-hide h-[454.8px]">
          {search
            ? friendLists
                .filter((friend) => {
                  return fromBytes32(friend.name)
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })
                .map((friends, i) => (
                  <Card
                    key={i + 1}
                    friends={friends}
                    i={i}
                    readMessage={readMessage}
                    readUser={readUser}
                    removeFriend={removeFriend}
                    clear={clear}
                  />
                ))
            : friendLists.map((friends, i) => (
                <Card
                  key={i + 1}
                  friends={friends}
                  i={i}
                  readMessage={readMessage}
                  readUser={readUser}
                  removeFriend={removeFriend}
                  clear={clear}
                />
              ))}
        </div>
        <div className="sm:col-span-2">
          <Chat
            sendMessage={sendMessage}
            deleteMessage={deleteMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            setFriendMsg={setFriendMsg}
            account={address}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
            profilePicture={profilePicture}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
