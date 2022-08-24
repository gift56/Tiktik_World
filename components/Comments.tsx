import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import NoResult from "./NoResult";

const Comments = () => {
  const comments = [];

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments.length ? (
          <div>Videos</div>
        ) : (
          <NoResult text="No Comments yet! Be the first to add a comment." />
        )}
      </div>
    </div>
  );
};

export default Comments;
