import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { formatRelative } from "date-fns";
import { ethers } from "ethers";
import { FaTrash } from "react-icons/fa";

import images from "../../public/assets";
import Loader from "../Loader";

const Chat = ({
  sendMessage,
  deleteMessage,
  readMessage,
  friendMsg,
  setFriendMsg,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
  profilePicture,
}) => {
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
    ipfsHash: "",
  });

  const router = useRouter();

  const fromBytes32 = (bytes) => {
    return ethers.utils.parseBytes32String(bytes);
  };

  const handleDeleteMessage = async (params) => {
    await deleteMessage(params);
    setFriendMsg((prevMsgs) =>
      prevMsgs.filter((_, index) => index !== params.index)
    );
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (router.query) {
      setChatData(router.query);
    }
  }, [router.query]);

  useEffect(() => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  }, [chatData.address]);

  const formatDate = (blockTimestamp) => {
    const date = new Date(blockTimestamp * 1000);
    return formatRelative(date, new Date());
  };

  return (
    <div className="p-4 sm:p-8 bg-black/25 rounded-lg ">
      {currentUserName && currentUserAddress ? (
        <div className="flex items-center gap-8 leading-none">
          <Image
            className="rounded-lg"
            src={`https://ipfs.io/ipfs/${chatData.ipfsHash}`}
            alt="image"
            width={60}
            height={60}
          />
          <div>
            <p className="text-2xl">{currentUserName}</p>
            <p className="text-xs hidden">{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mt-8 px-8">
        <div className="grid grid-cols-1 m-0 overflow-auto scrollbar-hide h-[50vh]">
          <div>
            {friendMsg.map((message, i) => {
              if (message.deleted) {
                return null;
              }
              return (
                <div ref={bottomRef} key={i + 1}>
                  {message.sender == chatData.address ? (
                    <div className="flex items-center gap-4 text-base mt-4">
                      <Image
                        className="rounded-[50%]"
                        src={`https://ipfs.io/ipfs/${chatData.ipfsHash}`}
                        alt="image"
                        width={50}
                        height={50}
                      />
                      <span>
                        {fromBytes32(chatData.name)} {""}
                        <small className="text-xs">
                          {formatDate(message.timestamp)}
                        </small>
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 text-base mt-4 ">
                      <Image
                        className="rounded-[50%]"
                        src={`https://ipfs.io/ipfs/${profilePicture}`}
                        alt="image"
                        width={50}
                        height={50}
                      />
                      <span className="relative">
                        {userName} {""}
                        <small>{formatDate(message.timestamp)}</small>
                      </span>
                    </div>
                  )}
                  <div
                    key={i + 1}
                    className={`flex justify-between items-center p-4 relative  rounded-t-lg rounded-bl-lg mt-1 ${
                      message.sender !== chatData.address
                        ? "bg-[#66b3e8]/25"
                        : "bg-[#66b3e8]/50"
                    }`}
                  >
                    <p>{message.msg}</p>
                    {message.sender !== chatData.address && (
                      <span
                        className="ml-2 cursor-pointer text-red-400 hover:text-red-600 align-right"
                        onClick={() =>
                          handleDeleteMessage({
                            friendAddress: chatData.address,
                            index: i,
                          })
                        }
                      >
                        <FaTrash size={18} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
          <div>
            <div className="flex items-center gap-4 mt-4">
              <Image
                className="cursor-pointer hover:opacity-50 transition duration-300"
                src={images.smile}
                alt="smile"
                width={50}
                height={50}
              />
              <input
                className="w-full p-4 text-white rounded-lg bg-[#66b3e8]/25 outline-0 border-0 focus:ring-0"
                type="text"
                placeholder="Type a message"
                value={message} // bind the input value to the message state
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image
                className="cursor-pointer hover:opacity-50 transition duration-300"
                src={images.file}
                alt="file"
                width={50}
                height={50}
              />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  className="cursor-pointer hover:opacity-50 transition duration-300"
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={() => {
                    sendMessage({ msg: message, address: chatData.address });
                    setMessage(""); // clear the input field}
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
