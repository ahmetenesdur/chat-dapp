import { useState, useContext, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";

import { ChatAppContext } from "../context/ChatAppContext";
import Model from "./Model";
import Error from "./Error";
import images from "../public/assets";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All User",
      link: "/alluser",
    },
    {
      menu: "Chat",
      link: "/",
    },
  ];

  const [active, setActive] = useState();
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { isConnected } = useAccount();
  const { account, userName, createAccount, error } =
    useContext(ChatAppContext);
  const { disconnect } = useDisconnect();

  //currentPage
  useEffect(() => {
    const currentPage = window.location.pathname;
    if (currentPage == "/") {
      setActive(2);
    } else if (currentPage == "/alluser") {
      setActive(1);
    }
  }, []);

  return (
    <div className="sm:relative sm:w-4/5 sm:mx-auto text-white w-11/12 m-4 mx-auto">
      <div className="flex justify-between sm:items-center sm:gap-8 sm:px-4  sm:py-4 gap-4 py-2 px-2">
        <div className="flex">
          <div className="sm:block" onClick={() => setActive(2)}>
            <Link href="/">
              <Image src={images.logo} alt="logo" width={100} height={100} />
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          {/* Desktop */}
          <div className="sm:flex sm:items-center sm:gap-8 sm:border-b-2 sm:border-solid sm:border-transparent sm:transition-all sm:duration-300 sm:ease-in-out hidden">
            {menuItems.map((items, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${
                  active == i + 1
                    ? "color-[#66b3e8] border-b-2 border-solid border-[#66b3e8] pb-2"
                    : ""
                }`}
              >
                <Link href={items.link}>{items.menu}</Link>
              </div>
            ))}
          </div>

          {/* Mobile */}
          {open && (
            <div className="sm:hidden block fixed z-50 bg-[#292F3F] inset-0 text-center pt-16">
              {menuItems.map((items, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  // click all div
                  className={`${"mt-8 cursor-pointer font-bold text-3xl"} ${
                    active == i + 1
                      ? "color-[#66b3e8] border-b-2 border-solid border-[#66b3e8] pb-2 "
                      : ""
                  }`}
                >
                  <Link href={items.link}>{items.menu}</Link>
                </div>
              ))}

              <div className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer">
                <Image
                  src={images.close}
                  alt="close"
                  width={45}
                  height={45}
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Connect Wallet */}
          <div className="flex justify-self-end pl-2">
            {!isConnected ? (
              <ConnectButton />
            ) : userName ? (
              <button
                className="bg-black/25 p-4 border-none rounded-lg font-bold text-[#66b3e8] cursor-pointer flex text-center gap-2 hover:bg-[#30556e] hover:text-white"
                onClick={() => {
                  disconnect();
                }}
              >
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                {""}
                <small>{userName || "Create Account"}</small>
              </button>
            ) : (
              <button
                className="bg-black/25 p-4 border-none rounded-lg font-bold text-[#66b3e8] cursor-pointer flex text-center gap-2 hover:bg-[#30556e] hover:text-white"
                onClick={() => setOpenModel(true)}
              >
                {""}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="Account image"
                  width={20}
                  height={20}
                />
                {""}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>

          <div
            className="sm:hidden block cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={35} height={35} />
          </div>
        </div>
      </div>

      {/* Model Component */}
      {openModel && (
        <div className="sm:fixed inset-0 bg-[#292F3F] z-50 absolute">
          {
            <Model
              openBox={setOpenModel}
              title="WELCOME TO"
              head="CHAT BUDDY"
              info="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate maxime assumenda exercitationem voluptatibus, vero aliquid in tempore aut, impedit dolores voluptate recusandae nulla fuga? Praesentium iusto mollitia sint fugit! Placeat?"
              smallInfo="Secret Key is used to encrypt your messages. Please keep it safe."
              image={images.hero}
              functionName={createAccount}
              address={account}
            />
          }
        </div>
      )}
      {error == "" ? "" : <Error error={error} />}
    </div>
  );
};

export default NavBar;
