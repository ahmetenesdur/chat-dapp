import { useState, useContext } from "react";
import Image from "next/image";

import images from "../public/assets";
import { ChatAppContext } from "../context/ChatAppContext";
import Model from "./Model";

const Filter = () => {
  const { addFriends } = useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className="relative sm:w-4/5 sm:mx-auto text-white w-11/12 m-4 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:gap-8 sm:px-4 sm:py-4 gap-4 py-2 px-2">
        <div>
          <div className="w-full flex items-center gap-4 rounded-3xl bg-black/25 text-orange-600 px-4">
            <Image src={images.search} alt="image" width={20} height={20} />
            <input
              className="bg-transparent p-4 text-orange-600 w-scren sm:w-80 outline-0 border-0"
              type="text"
              placeholder="Search.."
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button className="text-xs bg-black/25 text-orange-600 rounded-3xl font-bold flex items-center gap-2 py-4 px-4 outline-0 border-0 hover:bg-orange-700 hover:text-white">
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAR CHAT
          </button>
          <button
            className="text-xs bg-black/25 text-orange-600 rounded-3xl font-bold flex items-center gap-2 py-4 px-4 outline-0 border-0 hover:bg-orange-700 hover:text-white"
            onClick={() => setAddFriend(true)}
          >
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* Model Component */}
      {addFriend && (
        <div className="absolute inset-0 z-50 sm:fixed bg-[#292F3F] ">
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="CHAT BUDDY"
            info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
            smallInfo="Keep in touch with your friends and family."
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
