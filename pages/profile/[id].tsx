import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResult from "../../components/NoResult";
import { Video, IUser } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  return (
    <div>
      <div className="w-full">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className="w-16 h-16">
            <Image
              src={user.image}
              width={34}
              height={34}
              className="rounded-full"
              alt="user profile"
              layout="responsive"
            />
          </div>
          <div className="hidden xl:block">
            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
              {user.userName.replace(" ", "")}{" "}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="flex gap-1 items-center text-xs font-bold text-gray-400 capitalize">
              {user.userName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
