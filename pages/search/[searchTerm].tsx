import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { Video, IUser } from "../../types";
import useAuthStore from "../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccount, setIsAccount] = useState(true);

  const Accounts = isAccount ? "border-b-2 border-black" : "text-gray-400";

  const isVideos = !isAccount ? "border-b-2 border-black" : "text-gray-400";
  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-whiite w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${Accounts}`}
          onClick={() => setIsAccount(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccount(false)}
        >
          Videos
        </p>
      </div>
      {isAccount ? (
        <div>Account</div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          Videos
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
