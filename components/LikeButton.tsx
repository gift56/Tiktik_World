import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";

import useAuthStore from "../store/authStore";

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const { userProfile } = useAuthStore();

  return (
    <div className="gap-6">
      <div className="flex flex-col justify-center items-center mt-4 cursor-pointer">
        
      </div>
    </div>
  );
};

export default LikeButton;
