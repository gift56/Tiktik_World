import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();

  const { topic } = router.query;

  const activeTopicStyle =
    "xl:border-2 hover:bg-primary dark:hover:bg-gray-800 xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#f51997]";

  const topicStyle =
    "xl:border-2 hover:bg-primary dark:hover:bg-gray-800 xl:border-gray-300 dark:hover:xl:border-gray-600 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black dark:text-gray-100";

  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="tex-gray-500 font-semibold m-3 mt-4 hidden xl:block dark:text-white">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="text-2xl font-bold xl:text-md">{item.icon}</span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
