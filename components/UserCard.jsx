import Image from "next/image";

import images from "../public/assets";

const UserCard = ({ users, i, addFriends }) => {
  return (
    <div className="bg-black/25 rounded-lg text-center p-4 mb-8 relative">
      <div className="items-center flex flex-col">
        <Image
          className="rounded-[50%] mb-4"
          src={images[`image${i + 1}`]}
          alt="user"
          width={100}
          height={100}
        />

        <div className="text-white">
          <h3 className="mb-2">{users.name}</h3>
          <p className="mb-2">
            {users.accountAddress.slice(0, 12)}...
            {users.accountAddress.slice(-12)}
          </p>
          <button
            className="bg-black/25 text-[#66b3e8] w-6/12 p-4 border-0 rounded-lg text-base cursor-pointer hover:bg-[#30556e] hover:text-white"
            onClick={() =>
              addFriends({
                name: users.name,
                accountAddress: users.accountAddress,
              })
            }
          >
            Add Friend
          </button>
        </div>
      </div>

      <small className="absolute w-8 h-8 rounded-[50%] bg-[#66b3e8] text-white font-bold text-base top-4 right-4 align-middle flex items-center justify-center">
        {i + 1}
      </small>
    </div>
  );
};

export default UserCard;
