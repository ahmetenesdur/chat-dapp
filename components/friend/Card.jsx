import React from "react";
import Image from "next/image";
import Link from "next/link";

import images from "../../public/assets";

const Card = ({ readMessage, friends, i, readUser }) => {
  console.log(friends);

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
        <div className="flex items-center gap-4 cursor-pointer py-4 border-b border-[#f1820342] hover:bg-[#f1820342] rounded-lg overflow-auto">
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
              <small>{friends.pubkey.slice(21)}..</small>
            </div>
            <div>
              <small>{i + 1}</small>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
