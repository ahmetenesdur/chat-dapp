import React, { useState, useContext } from "react";
import Image from "next/image";

import images from "../public/assets";
import { ChatAppContext } from "../Context/ChatAppContext";
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
  // UseState
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading } = useContext(ChatAppContext);
  return (
    <div className="w-[%95] sm:w-[%85] sm:m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:items-center">
        <div>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div>
          <h1 className="text-sm leading-4 sm:text-5xl sm:text-[#F18303] ">
            {title} <span>{head}</span>
          </h1>
          <p className="text-4xl sm:block sm:text-7xl">{info}</p>
          <small className="text-xl text-[#F18303]">{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div>
              <div className="">
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Image src={images.account} alt="user" width={30} height={30} />
                <input
                  type="text"
                  placeholder={address || "Enter address.."}
                  onChange={(e) => setAccountAddress(e.target.value)}
                />
              </div>

              <div>
                <button onClick={() => functionName({ name, accountAddress })}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
                </button>

                <button onClick={() => openBox(false)}>
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
