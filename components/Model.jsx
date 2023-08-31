import { useState, useContext } from "react";
import Image from "next/image";

import images from "../public/assets";
import { ChatAppContext } from "../context/ChatAppContext";
import Loader from "./Loader";
import saveToIPFS from "../utils/saveToIPFS";

// Defining the Model component
const Model = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName,
  createAccount,
  addFriends,
}) => {
  // State variables
  const [name, setName] = useState("");
  const [userAddress, setUserAddress] = useState(address);
  const [profilePicture, setProfilePicture] = useState(null);
  const [pictureLoading, setPictureLoading] = useState(false);

  // Using context
  const { loading, setLoading } = useContext(ChatAppContext);

  // Function to handle form submission
  const submit = async () => {
    try {
      if (functionName === "createAccount") {
        setPictureLoading(true);
        const picCid = await saveToIPFS(profilePicture);
        setPictureLoading(false);
        await createAccount({ name, picCid });
      }
      if (functionName === "addFriends") {
        await addFriends({ userAddress, name });
      }

      if (!loading) {
        openBox(false);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // screen center model
    <div className="fixed z-50 inset-0 overflow-auto  items-center flex justify-center bg-[#1f2937]">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:items-center p-20">
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
          {loading || pictureLoading ? (
            <Loader pictureLoading={pictureLoading} />
          ) : (
            <div>
              {createAccount && (
                <div className="flex items-center gap-4 p-4 rounded-lg sm:m-4 my-4 bg-black/25">
                  <Image src={images.file} alt="user" width={30} height={30} />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                  />
                </div>
              )}

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
                  placeholder="Enter name here.."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 p-4 rounded-lg sm:m-4 my-4 bg-black/25">
                <Image src={images.account} alt="user" width={30} height={30} />
                <input
                  className="w-[100%] bg-transparent text-white outline-none border-none"
                  type="text"
                  placeholder={address || "Enter address here.."}
                  value={address || userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 z-50 sm:grid-cols-2 gap-4 sm:mx-4">
                <button
                  className="outline-none border-none text-xl font-bold text-[#66b3e8] bg-black/25 p-4 border-2 rounded-lg flex items-center justify-center gap-4 cursor-pointer hover:bg-[#30556e] hover:text-white"
                  onClick={submit}
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
