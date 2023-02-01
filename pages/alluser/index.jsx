import { useContext } from "react";
import { ChatAppContext } from "../../context/ChatAppContext";
import UserCard from "../../components/UserCard";

const AllUser = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);

  return (
    <div className="sm:relative sm:w-4/5 text-white w-11/12 m-8 mx-auto">
      <div className="text-4xl text-center m-8 sm:m-12 sm:text-5xl text-white font-bold">
        <p>Find Your Friends</p>
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
