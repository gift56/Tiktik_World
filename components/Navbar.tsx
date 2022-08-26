import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/logo.png";
import { createOrGetGoogleUser } from "../utils";
import useAuthStore from "../store/authStore";
import { HiMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { userProfile, removeUser, addUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mount, setMount] = useState(false);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  useEffect(() => {
    setMount(true);
  }, []);

  const renderThemeChangerIcon = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (!mount) return null;

    if (currentTheme === "dark") {
      return (
        <button
          type="button"
          className="bg-gray-200 dark:bg-gray-600 p-2 rounded-md hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600"
          onClick={() => setTheme("light")}
        >
          <HiOutlineSun fontSize={17} />
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="bg-gray-200 p-2 rounded-md hover:ring-2 hover:ring-gray-300"
          onClick={() => setTheme("dark")}
        >
          <HiMoon fontSize={16} />
        </button>
      );
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] flex items-center md:gap-1">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik"
          />
          <span className="text-pink-500 font-bold text-xl tracking-wider md:text-2xl cursor-pointer">TIKTIK</span>
        </div>
      </Link>
      <div className="relative hidden lg:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white dark:bg-[#1d2225]"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary dark:bg-gray-900 dark:border-gray-800 p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
            placeholder="Search Videos and accounts"
          />
          <button
            onClick={handleSearch}
            className="absolute right-6 top-4 md:right-5 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-2 md:gap-10 items-center">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 py-1 text-md font-semibold flex items-center gap-2 rounded">
                <IoMdAdd className="text-xl" />
                {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer hidden md:block"
                    src={userProfile.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="md:px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={25} />
            </button>
            {renderThemeChangerIcon()}
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetGoogleUser(res, addUser)}
            onError={() => console.log("error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
