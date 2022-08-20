import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";

const Upload = () => {
  const [isLoading, setIsloading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.file[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setWrongFileType(false);
        });
    } else {
      setIsloading(false);
      setWrongFileType(true);
    }
  };
  return (
    <div className="flex w-full h-full">
      <div className="bg-white rounded-lg">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload a Video</p>
            <p className="text-md text-gray-400">Post videos to your account</p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 transition-all">
            {isLoading ? (
              <p>Uploading......</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div></div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
