import { useContext } from "react";
import { ChatAppContext } from "../../context/ChatAppContext";
import UserCard from "../../components/UserCard";
import { useAccount } from "wagmi";

const AllUser = () => {
  const { userName, userLists, addFriends } = useContext(ChatAppContext);

  const { isConnected } = useAccount();

  return (
    <div className="sm:relative sm:w-4/5 text-white w-11/12 m-8 mx-auto">
      <div className="text-4xl text-center m-8 sm:m-12 sm:text-5xl text-white font-bold">
        <p>Find Your Friends</p>
      </div>

      <div className="grid-cols-1 sm:m-8 sm:grid sm:gap-12 sm:grid-cols-3">
        {!isConnected ? (
          <div className="text-center text-xl sm:text-2xl sm:col-span-3">
            <>Please connect your wallet</>
          </div>
        ) : !userName ? (
          <div className="text-center text-xl sm:text-2xl sm:col-span-3">
            <>Please Create Account</>
          </div>
        ) : (
          userLists.map((users, i) => (
            <UserCard key={i + 1} users={users} i={i} addFriends={addFriends} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllUser;
