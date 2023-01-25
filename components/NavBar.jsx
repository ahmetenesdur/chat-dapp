import React, { useState, useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

//Internal Imports
// import { ChatAppContext } from "../../Context/ChatAppContext";
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

  // const { account, userName, connectWallet, error } =
  //   useContext(ChatAppContext);
  return (
    <div className="sm:relative sm:w-4/5 sm:m-8 w-11/12 m-8 text-white sm:mx-auto">
      <div className="flex sm:items-center justify-between sm:gap-8 gap-4 sm:py-4 py-2 sm:px-4 px-2">
        <div className="flex">
          {/*  Logo Image and link to home page */}
          <div className="sm:block hidden">
            <Link href="/">
              <Image src={images.logo} alt="logo" width={50} height={50} />
            </Link>
          </div>
        </div>
        <div className="sm:flex sm:justify-between sm:items-center gap-4 ">
          {/* // Desktop */}
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
            <div className="block fixed z-50 bg-[#292F3F] inset-0 text-center pt-16 sm:hidden">
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${"mt-4"} ${active == i + 1 ? "pt-8" : ""}`}
                >
                  <Link href={el.link}>{el.menu}</Link>
                </div>
              ))}

              <p className="pt-8">
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}

          {/* CONNECT WALLET */}
          <div className="flex justify-self-end">
            <ConnectButton />
          </div>

          <div className="sm:hidden block" onClick={() => setOpen(true)}>
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>

      {/* Model Component */}
      {/* {openModel && (
        <div className={Style.modelBox}>
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
      )} */}
      {/* {error == "" ? "" : <Error error={error} />} */}
    </div>
  );
};

export default NavBar;
