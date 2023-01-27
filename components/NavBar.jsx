import React, { useState, useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

import { ChatAppContext } from "../context/ChatAppContext";
import Model from "./Model";
// import Error from "./Error";
import images from "../public/assets";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "/",
    },
    {
      menu: "Chat",
      link: "/",
    },
    {
      menu: "Contact",
      link: "/",
    },
    {
      menu: "Settings",
      link: "/",
    },
    {
      menu: "FAQ",
      link: "/",
    },
    {
      menu: "Terms of Use",
      link: "/",
    },
  ];

  // UseState
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { address, isConnected } = useAccount();
  const { account, userName, createAccount, error } =
    useContext(ChatAppContext);

  return (
    <div className="sm:relative sm:w-4/5 sm:m-8 sm:mx-auto text-white w-11/12 m-8 mx-auto">
      <div className="flex justify-between sm:items-center sm:gap-8 sm:px-4  sm:py-4 gap-4 py-2 px-2">
        <div className="flex">
          <div className="sm:block">
            <Link href="/">
              <Image src={images.logo} alt="logo" width={50} height={50} />
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          {/* Desktop */}
          <div className="sm:flex sm:items-center sm:gap-8 sm:border-b-2 sm:border-solid sm:border-transparent sm:transition-all sm:duration-300 sm:ease-in-out hidden">
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${
                  active == i + 1
                    ? "color-[#F18303] border-b-2 border-solid border-[#F18303] pb-2"
                    : ""
                }`}
              >
                <Link href={el.link}>{el.menu}</Link>
              </div>
            ))}
          </div>

          {/* Mobile */}
          {open && (
            <div className="sm:hidden block fixed z-50 bg-[#292F3F] inset-0 text-center pt-16 ">
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${"mt-4"} ${
                    active == i + 1
                      ? "color-[#F18303] border-b-2 border-solid border-[#F18303] pb-2 "
                      : ""
                  }`}
                >
                  <Link href={el.link}>{el.menu}</Link>
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
          <div className="flex justify-self-end">
            {!isConnected ? (
              <ConnectButton />
            ) : (
              <button
                className="bg-[#000000]/25 p-4 border-none rounded-lg font-bold text-[#F18303] cursor-pointer flex text-center gap-2"
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
        <div className="sm:fixed sm:inset-0 bg-[#292F3F] z-50 absolute bottom-3/4">
          {
            <Model
              openBox={setOpenModel}
              title="WELCOME TO"
              head="CHAT BUDDY"
              info="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate maxime assumenda exercitationem voluptatibus, vero aliquid in tempore aut, impedit dolores voluptate recusandae nulla fuga? Praesentium iusto mollitia sint fugit! Placeat?"
              smallInfo="Kindley seclet your name..."
              image={images.hero}
              functionName={createAccount}
              address={account}
            />
          }
        </div>
      )}
      {/* {error == "" ? "" : <Error error={error} />} */}
    </div>
  );
};

export default NavBar;
