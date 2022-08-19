import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover = () => {
  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
      <p className="tex-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div>
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
