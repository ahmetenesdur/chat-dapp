import { useState, useContext } from "react";
import Image from "next/image";

import images from "../public/assets";
import { ChatAppContext } from "../context/ChatAppContext";
import Loader from "./Loader";

const Model = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);

  return (
    <div className="w-[%90] m-4 sm:w-[%80] sm:m-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:items-center">
        <div>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div>
          <div className="flex flex-col gap-4 sm:mx-4">
            <h1 className="text-sm sm:text-5xl text-[#66b3e8] ">
              {title} <br />
              <span className="text-4xl sm:block sm:text-7xl">{head}</span>
            </h1>
            <p>{info}</p>
            <small className="text-xl text-[#66b3e8]">{smallInfo}</small>
          </div>
          {loading == true ? (
            <Loader />
          ) : (
            <div>
              <div className="flex items-center gap-4 p-4 rounded-lg sm:m-4 my-4 bg-black/25">
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  className="w-[100%] bg-transparent text-white outline-none border-none"
                  type="text"
                  placeholder="Enter Name.."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg sm:m-4 my-4 bg-black/25">
                <Image src={images.account} alt="user" width={30} height={30} />
                <input
                  className="w-[100%] bg-transparent text-white outline-none border-none"
                  type="text"
                  placeholder={address || "Enter address.."}
                  value={address}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 z-50 sm:grid-cols-2 gap-4 sm:mx-4">
                <button
                  className="outline-none border-none text-xl font-bold text-[#66b3e8] bg-black/25 p-4 border-2 rounded-lg flex items-center justify-center gap-4 cursor-pointer hover:bg-[#30556e] hover:text-white"
                  onClick={() => functionName({ name, accountAddress })}
                >
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
                </button>

                <button
                  className="outline-none border-none text-xl font-bold text-[#66b3e8] bg-black/25 p-4 border-2 rounded-lg flex items-center justify-center gap-4 cursor-pointer hover:bg-[#30556e] hover:text-white"
                  onClick={() => openBox(false)}
                >
                  {""}
                  <Image src={images.close} alt="send" width={30} height={30} />
                  {""}
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;
