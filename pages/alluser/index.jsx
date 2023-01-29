import { useContext } from "react";
import { ChatAppContext } from "../../context/ChatAppContext";
import UserCard from "../../components/userCard";

const AllUser = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);

  return (
    <div>
      <div className="w-11/12 text-xl m-8 sm:w-4/5 sm:m-16 sm:text-4xl text-white font-bold">
        <h1>Find Your Friends</h1>
      </div>

      <div className="w-11/12 grid-cols-1 sm:w-4/5 sm:m-8 sm:grid sm:gap-12 sm:grid-cols-3">
        {userLists.map((users, i) => (
          <UserCard key={i + 1} users={users} i={i} addFriends={addFriends} />
        ))}
      </div>
    </div>
  );
};

export default AllUser;
