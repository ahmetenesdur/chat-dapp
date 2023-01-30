import { useContext } from "react";
import { ChatAppContext } from "../../context/ChatAppContext";
import UserCard from "../../components/UserCard";

const AllUser = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);

  return (
    <div className="sm:relative sm:w-4/5 text-white w-11/12 m-4 mx-auto">
      <div className="text-3xl m-4 sm:m-8 sm:text-5xl text-white font-bold">
        <h1>Find Your Friends</h1>
      </div>

      <div className="grid-cols-1 sm:m-8 sm:grid sm:gap-12 sm:grid-cols-3">
        {userLists.map((users, i) => (
          <UserCard key={i + 1} users={users} i={i} addFriends={addFriends} />
        ))}
      </div>
    </div>
  );
};

export default AllUser;
