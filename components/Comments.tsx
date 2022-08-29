import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import NoResult from "./NoResult";
import { IUser } from "../types";

interface IProps {
  postingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  postingComment,
  comment,
  setComment,
  addComment,
  comments,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] dark:bg-[#1d2225] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[290px]">
        {comments?.length ? (
          comments.map((item, index) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={index}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex gap-3 items-start">
                          <div className="w-8 h-8">
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
                            <p className="flex gap-1 items-center text-md font-bold text-primary dark:text-gray-100 lowercase">
                              {user.userName.replace(" ", "")}{" "}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="flex gap-1 items-center text-xs font-bold text-gray-400 dark:text-gray-300 capitalize">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <div className="mt-3">
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResult text="No Comments yet!" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-[-97px] left-0 pb-6 px-2 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment..."
              className="bg-primary dark:bg-gray-800 dark:border-gray-800 px-6 py-4 text-md font-medium border-2 w-[100%] md:w-[500px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-md text-gray-400 bg-[#f51997] text-center rounded text-md font-medium  py-4 px-3 w-25 outline-none dark:text-gray-100" onClick={addComment}>
              {postingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
