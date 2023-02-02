import React from "react";
import Image from "next/image";
import Link from "next/link";

import images from "../../public/assets";

const Card = ({ readMessage, friends, i, readUser }) => {
  return (
    <Link
      href={{
        pathname: "/",
        query: { name: `${friends.name}`, address: `${friends.pubkey}` },
      }}
    >
      <div
        onClick={() => (readMessage(friends.pubkey), readUser(friends.pubkey))}
      >
        <div className="flex items-center gap-4 cursor-pointer p-4 sm:px-8 border-b border-[#66b3e8] hover:bg-[#66b3e8]/50 hover:text-white">
          <div className="rounded-lg">
            <Image
              src={images.accountName}
              alt="username"
              width={50}
              height={50}
            />
          </div>
          <div className="flex gap-12">
            <div className="-mt-0">
              <h4>{friends.name}</h4>
              <small>
                {friends.pubkey.slice(0, 8)}...{friends.pubkey.slice(-8)}
              </small>
            </div>
            {/* be in line */}
            <div className="flex items-center gap-2 ml-auto">
              <small>{i + 1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
