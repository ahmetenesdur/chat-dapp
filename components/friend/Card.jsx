import Image from "next/image";
import Link from "next/link";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

const Card = ({ readMessage, friends, i, readUser, removeFriend, clear }) => {
  const router = useRouter();

  const fromBytes32 = (bytes) => {
    return ethers.utils.parseBytes32String(bytes);
  };

  const handleRemoveFriend = async (event, friendAddress) => {
    event.stopPropagation(); // Stop the event from triggering parent elements (like Link)
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to remove this friend?"
    );
    if (!confirmed) return;

    await removeFriend(friendAddress);
    router.push("/");
    clear();
  };

  return (
    <Link
      href={{
        pathname: "/",
        query: {
          name: `${friends.name}`,
          address: `${friends.pubkey}`,
          ipfsHash: `${friends.ipfsHash}`,
        },
      }}
    >
      <div
        onClick={() => (readMessage(friends.pubkey), readUser(friends.pubkey))}
      >
        <div className="flex items-center gap-4 cursor-pointer p-4 sm:px-8 border-b border-[#66b3e8] hover:bg-[#66b3e8]/50 hover:text-white">
          <div className="rounded-lg">
            <Image
              className="rounded-lg"
              src={`https://ipfs.io/ipfs/${friends.ipfsHash}`}
              alt="username"
              width={50}
              height={50}
            />
          </div>
          <div className="flex">
            <div className="-mt-0">
              <h4>{fromBytes32(friends.name)}</h4>
              <small>
                {friends.pubkey.slice(0, 8)}...{friends.pubkey.slice(-8)}
              </small>
            </div>
          </div>
          <div className="flex items-center ml-auto cursor-pointer text-red-400 hover:text-red-600 align-right ">
            <button onClick={(e) => handleRemoveFriend(e, friends.pubkey)}>
              <MdOutlineRemoveCircleOutline size={22} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
