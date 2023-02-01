import { useState, useContext } from "react";
import Image from "next/image";

import images from "../public/assets";
import { ChatAppContext } from "../context/ChatAppContext";
import Model from "./Model";

const Filter = () => {
  const { addFriends, userName } = useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className="relative sm:w-4/5 text-white w-11/12 m-4 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center  sm:py-4 gap-4 py-2">
        <div>
          <div className="w-full flex items-center gap-4 rounded-xl bg-black/25 text-orange-600 px-4">
            <Image src={images.search} alt="image" width={20} height={20} />
            <input
              className="bg-transparent p-4 text-orange-600 w-scren sm:w-80 outline-0 border-0"
              type="text"
              placeholder="Search.."
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="text-xs bg-black/25 text-orange-600 rounded-xl font-bold flex items-center gap-2 py-4 px-4 outline-0 border-0 hover:bg-orange-700 hover:text-white"
            onClick={() => setAddFriend(true)}
            disabled={ userName ? false : true }
          >
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* Model Component */}
      {addFriend && (
        <div className="block fixed z-50 bg-[#292F3F] inset-0 overflow-auto">
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
