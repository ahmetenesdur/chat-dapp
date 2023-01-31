import { useContext } from "react";

import Card from "./Card";
import Chat from "./Chat";
import { ChatAppContext } from "../../context/ChatAppContext";

const Friend = () => {
  const {
    sendMessage,
    account,
    friendLists,
    readMessage,
    userName,
    loading,
    friendMsg,
    currentUserName,
    currentUserAddress,
    readUser,
  } = useContext(ChatAppContext);

  return (
    <div className="sm:relative sm:w-4/5 sm:mx-auto text-white w-11/12 m-4 mx-auto">
      <div className="grid-cols-1 sm:grid-cols-3 sm:grid sm:gap-8">
        <div className="bg-black/25 p-4 rounded-lg">
          {friendLists.map((friends, i) => (
            <Card
              key={i + 1}
              friends={friends}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div>
        <div>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
