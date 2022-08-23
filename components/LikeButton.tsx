import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "../store/authStore";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const { userProfile } = useAuthStore();

  return (
    <div className="gap-6">
      <div className="flex flex-col justify-center items-center mt-4 cursor-pointer">
        {liked ? (
          <div className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]">
            <MdFavorite className="text-lg md:text-3xl" />
          </div>
        ) : (
          <div>
            <MdFavorite className="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LikeButton;
