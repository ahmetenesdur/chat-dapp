import Image from "next/image";
import images from "../public/assets";

const UserCard = ({ users, i, addFriends }) => {
  console.log(users);

  return (
    <div className="bg-black/25 rounded-lg text-center p-4 relative">
      <div>
        <Image
          className="rounded-[50%]"
          src={images[`image${i + 1}`]}
          alt="user"
          width={100}
          height={100}
        />

        <div className="leading-3 text-white">
          <h3>{users.name}</h3>
          <p>{users.accountAddress.slice(0, 25)}..</p>
          <button
            className="bg-black/25 text-[#F18303] w-6/12 p-4 border-0 rounded-lg text-base cursor-pointer"
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

      <small className="absolute p-4 rounded-[50%] bg-[#F18303] text-white top-4 right-4">
        {i + 1}
      </small>
    </div>
  );
};

export default UserCard;
