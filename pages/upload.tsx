import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaCloudDownloadAlt } from "react-icons/fa";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";

const Upload = () => {
  const [isLoading, setIsloading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [caption, setCaption] = useState("");
  const [cartegory, setCartegory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setIsloading(true);
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setIsloading(false);
        });
    } else {
      setIsloading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && cartegory) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: cartegory,
      };
      await axios.post(`${BASE_URL}/api/post`, document);
      router.push("/");
    }
  };

  return (
    <div className="flex w-full absolute top-[55px] md:top-[68px] left-0 mb-10 pt-10 lg:pt-20 justify-center bg-[#f8f8f8] dark:bg-black h-max">
      <div className="bg-white dark:bg-gray-800 rounded-lg flex gap-6 flex-wrap justify-between items-center p-4 md:p-14 pt-6 xl:h-max xl:mb-10 w-[90%] lg:w-[60%]">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload a Video</p>
            <p className="text-md text-gray-400 dark:text-gray-300">Post videos to your account</p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
            {isLoading ? (
              <p>Uploading......</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset?.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <p className="font-bold text-xl">
                        <FaCloudDownloadAlt className="text-gray-300 text-6xl" />
                      </p>
                      <p className="font-semibold text-xl">Upload Video</p>
                    </div>
                    <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                      MP4 or WebM or ogg <br />
                      720x1280 or higher <br />
                      Up to 10 minutes <br />
                      Less than 2GB
                    </p>
                    <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-25 outline-none">
                      Select File
                    </p>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="font-semibold mt-4 w-[250px] text-center text-red-400 text-xl">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10 w-full lg:w-max">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="p-2 rounded outline-none text-md border-2 border-gray-200 dark:bg-gray-600 dark:border-gray-500"
          />
          <label className="text-md font-medium">Choose a Catergory</label>
          <select
            className="p-2 rounded outline-none text-md capitalize border-2 border-gray-200 dark:bg-gray-600 dark:border-gray-500 lg:p-4 cursor-pointer"
            onChange={(e) => setCartegory(e.target.value)}
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="capitalize outline-none bg-white dark:bg-gray-600 dark:text-gray-100 text-gray-700 text-md p-2 hover:bg-slate-300"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={() => router.push("/")}
              type="button"
              className="text-md border-2 font-medium p-2 rounded  w-28 lg:w-44 outline-none border-gray-300"
            >
              Discard
            </button>

            <button
              onClick={handlePost}
              type="button"
              className="text-md border-2 font-medium p-2 rounded  w-28 lg:w-44 outline-none bg-[#f51997] text-white border-[#f51997]"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
