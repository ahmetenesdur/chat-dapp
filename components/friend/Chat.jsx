import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { formatRelative } from "date-fns";

import images from "../../public/assets";
import Loader from "../Loader";

const Chat = ({
  sendMessage,
  readMessage,
  friendMsg,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
}) => {
  const [message, setMessage] = useState("");
  const [chatData, setChatData] = useState({
    name: "",
    address: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setChatData(router.query);
  }, [router.isReady]);

  useEffect(() => {
    if (chatData.address) {
      readMessage(chatData.address);
      readUser(chatData.address);
    }
  }, []);

  const formatDate = (blockTimestamp) => {
    const date = new Date(blockTimestamp * 1000);
    return formatRelative(date, new Date());
  };

  return (
    <div className="p-4 sm:p-8 bg-black/25 rounded-lg ">
      {currentUserName && currentUserAddress ? (
        <div className="flex items-center gap-8 leading-none">
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div>
            <h1>{currentUserName}</h1>
            <p className="text-xs hidden">{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mt-8">
        <div className="grid grid-cols-1 m-0 overflow-auto h-[50vh]">
          <div>
            {friendMsg.map((message, i) => (
              <div key={i + 1}>
                {message.sender == chatData.address ? (
                  <div className="flex items-center gap-4 text-base">
                    <Image
                      src={images.accountName}
                      alt="image"
                      width={50}
                      height={50}
                    />
                    <span>
                      {chatData.name} {""}
                      <small className="text-xs">
                        {formatDate(message.timestamp)}
                      </small>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-base">
                    <Image
                      src={images.accountName}
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
                <p
                  className="text-xs p-4 relative bg-[#66b3e8]/40 rounded-t-lg rounded-bl-lg"
                  key={i + 1}
                >
                  {message.msg}
                  {""}
                  {""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
          <div>
            <div className="flex items-center gap-4 mt-4">
              <Image src={images.smile} alt="smile" width={50} height={50} />
              <input
                className="w-full p-4 text-white rounded-lg bg-[#66b3e8]/25 outline-0 border-0"
                type="text"
                placeholder="Type a message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={() =>
                    sendMessage({ msg: message, address: chatData.address })
                  }
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
